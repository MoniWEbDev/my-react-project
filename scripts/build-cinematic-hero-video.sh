#!/usr/bin/env bash
set -euo pipefail

# Build a cinematic, loop-friendly recycling hero video from 5 source clips.
# Requires: ffmpeg
# Input clips expected in public/videos/source_clips:
#   01-waste-problem.mp4
#   02-collection-sorting.mp4
#   03-processing.mp4
#   04-final-products.mp4
#   05-positive-ending.mp4
# Output:
#   public/videos/recycling.mp4

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT_DIR/public/videos/source_clips"
TMP_DIR="$ROOT_DIR/public/videos/.build_tmp"
OUT_FILE="$ROOT_DIR/public/videos/recycling.mp4"
LOCAL_FFMPEG="$ROOT_DIR/tools/ffmpeg-static/ffmpeg"

mkdir -p "$TMP_DIR"

if [[ -x "$LOCAL_FFMPEG" ]]; then
  FFMPEG="$LOCAL_FFMPEG"
elif command -v ffmpeg >/dev/null 2>&1; then
  FFMPEG="$(command -v ffmpeg)"
else
  echo "Error: ffmpeg is not installed."
  echo "Install on Ubuntu: sudo apt update && sudo apt install -y ffmpeg"
  echo "Or use local static binary at tools/ffmpeg-static/ffmpeg"
  exit 1
fi

for clip in \
  "01-waste-problem.mp4" \
  "02-collection-sorting.mp4" \
  "03-processing.mp4" \
  "04-final-products.mp4" \
  "05-positive-ending.mp4"
do
  if [[ ! -f "$SRC_DIR/$clip" ]]; then
    echo "Missing clip: $SRC_DIR/$clip"
    exit 1
  fi
done

# Normalize each clip to 1920x1080, 30fps, no audio, and trim to 4s
for idx in 01 02 03 04 05; do
  in_file="$(find "$SRC_DIR" -maxdepth 1 -type f -name "${idx}-*.mp4" | head -n 1)"

  if [[ -z "$in_file" ]]; then
    echo "Missing normalized input matching: ${idx}-*.mp4"
    exit 1
  fi

  out_file="$TMP_DIR/${idx}.mp4"

  "$FFMPEG" -y -i "$in_file" \
    -t 4 \
    -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,eq=saturation=1.08:contrast=1.06:brightness=0.01" \
    -an \
    -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    "$out_file"
done

# Crossfade 5 clips into one seamless cinematic sequence
# Each clip is 4s, transition 0.4s. Offsets: 3.6, 7.2, 10.8, 14.4
"$FFMPEG" -y \
  -i "$TMP_DIR/01.mp4" \
  -i "$TMP_DIR/02.mp4" \
  -i "$TMP_DIR/03.mp4" \
  -i "$TMP_DIR/04.mp4" \
  -i "$TMP_DIR/05.mp4" \
  -filter_complex "\
[0:v][1:v]xfade=transition=fade:duration=0.4:offset=3.6[v1];\
[v1][2:v]xfade=transition=fade:duration=0.4:offset=7.2[v2];\
[v2][3:v]xfade=transition=fade:duration=0.4:offset=10.8[v3];\
[v3][4:v]xfade=transition=fade:duration=0.4:offset=14.4[v4];\
[v4]format=yuv420p[vout]" \
  -map "[vout]" \
  -r 30 \
  -movflags +faststart \
  -c:v libx264 -preset medium -crf 21 \
  "$OUT_FILE"

echo "Created: $OUT_FILE"
ls -lh "$OUT_FILE"

echo "Done. If you want tighter looping, use visually similar first and last shots."
