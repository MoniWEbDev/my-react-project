import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react';
import './Skill.css';

const Skill = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');

  const summary = {
    totalSkills: 101,
    overallProgress: '1%',
    skillsCompleted: '1',
    certificates: '1',
    points: '270',
    currentSkill: 'Crop Cultivation',
  };

  const skills = [
    {
      id: 1,
      title: 'Crop Cultivation',
      category: 'Agriculture',
      level: 'Beginner',
      description: 'Learn crop cultivation with structured modules, real tasks, and practical outcomes.',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=240&fit=crop',
      progress: 0,
      modules: 5,
      status: 'In progress',
    },
    {
      id: 2,
      title: 'Soil Health Management',
      category: 'Agriculture',
      level: 'Intermediate',
      description: 'Learn soil health management with structured modules, real tasks, and practical outcomes.',
      image: 'https://images.unsplash.com/photo-1516628549235-a6a93b575b1f?w=400&h=240&fit=crop',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 3,
      title: 'Organic Farming',
      category: 'Agriculture',
      level: 'Beginner',
      description: 'Learn organic farming with structured modules, real tasks, and practical outcomes.',
      image: 'https://images.unsplash.com/photo-1585865787033-3449d8be48d5?w=400&h=240&fit=crop',
      progress: 0,
      modules: 5,
      status: 'In progress',
    },
    {
      id: 4,
      title: 'Seed Preservation',
      category: 'Agriculture',
      level: 'Beginner',
      description: 'Learn seed preservation with structured modules, real tasks, and practical outcomes.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=240&fit=crop',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
    {
      id: 5,
      title: 'Composting Basics',
      category: 'Waste Management',
      level: 'Beginner',
      description: 'Learn composting with structured modules, real tasks, and practical outcomes.',
      image: 'https://images.unsplash.com/photo-1595433615718-03bd919badc0?w=400&h=240&fit=crop',
      progress: 35,
      modules: 4,
      status: 'Not started',
    },
    {
      id: 6,
      title: 'Upcycling Crafts',
      category: 'Waste Management',
      level: 'Intermediate',
      description: 'Learn upcycling with structured modules, real tasks, and practical outcomes.',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=240&fit=crop',
      progress: 0,
      modules: 6,
      status: 'Not started',
    },
    {
      id: 7,
      title: 'Water Saving Methods',
      category: 'Agriculture',
      level: 'Advanced',
      description: 'Master farm-level water conservation through practical planning and field tasks.',
      image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&h=240&fit=crop',
      progress: 0,
      modules: 4,
      status: 'Not started',
    },
    {
      id: 8,
      title: 'Rural Compost Economics',
      category: 'Waste Management',
      level: 'Intermediate',
      description: 'Learn how composting can generate village income with realistic case studies.',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=240&fit=crop',
      progress: 0,
      modules: 5,
      status: 'Not started',
    },
  ];

  const stats = [
    { label: 'Overall Progress', value: summary.overallProgress },
    { label: 'Skills Completed', value: summary.skillsCompleted },
    { label: 'Certificates', value: summary.certificates },
    { label: 'Points', value: summary.points },
  ];

  const filteredSkills = skills.filter((skill) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      skill.title.toLowerCase().includes(query) ||
      skill.description.toLowerCase().includes(query);
    const matchesCategory = categoryFilter === 'All' || skill.category === categoryFilter;
    const matchesLevel = levelFilter === 'All' || skill.level === levelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <section className="skill-page">
      <div className="skill-header">
        <h1>{summary.totalSkills} Skills Learning Hub</h1>
        <p>Explore all 101 skills with structured videos, adaptive testing, and practical assignments.</p>

        <div className="skill-stats">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <span className="stat-label">{stat.label}</span>
              <div className="stat-track">
                <span className="stat-value">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="continue-learning-btn">
          Continue Learning: {summary.currentSkill}
        </button>
      </div>

      <div className="explore-skills">
        <h2>Explore Skills</h2>

        <div className="skill-controls">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search all 101 skills"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="skill-search"
            />
          </div>

          <div className="skill-filters">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option>All</option>
              <option>Agriculture</option>
              <option>Waste Management</option>
            </select>

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="filter-select"
            >
              <option>All</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <button className="voice-search-btn">
              <Mic size={16} /> Voice Search
            </button>
          </div>
        </div>

        <div className="skill-grid">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="skill-card">
              <div className="skill-image-container">
                <img src={skill.image} alt={skill.title} className="skill-image" />
              </div>

              <div className="skill-content">
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-meta">
                  {skill.category} • {skill.level}
                </p>
                <p className="skill-description">{skill.description}</p>

                <div className="progress-section">
                  <div className="progress-header">
                    <span className="progress-label">Skill progress</span>
                    <span className="progress-value">{skill.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="skill-info">
                  <span className="module-count">▦ {skill.modules} modules</span>
                  <span className="module-status">◉ {skill.status}</span>
                </div>

                <button className="open-skill-btn">Open Skill</button>
              </div>
            </div>
          ))}

          {filteredSkills.length === 0 ? (
            <div className="skill-empty-state">
              <p>No skills match your current search or filters.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Skill;
