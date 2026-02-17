
// src/pages/CustomPackage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Fixed: Added this import
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import TestCard from './components/TestCard';
import SelectedTestsSidebar from './components/SelectedTestsSidebar';
import RecommendationSection from './components/RecommendationSection';
import TestInfoModal from './components/TestInfoModal';

// Expanded test data — you can keep adding more easily here
const tests = [
  // Blood
  { id: 'cbc', name: 'Complete Blood Count (CBC)', description: 'Full blood cell analysis', price: 350, duration: '6 hours', sampleType: 'Blood', category: 'blood', fasting: false },
  { id: 'lft', name: 'Liver Function Test (LFT)', description: 'Liver enzymes & proteins', price: 550, duration: '12 hours', sampleType: 'Blood', category: 'blood', fasting: true },
  { id: 'kft', name: 'Kidney Function Test (KFT)', description: 'Kidney health markers', price: 500, duration: '12 hours', sampleType: 'Blood', category: 'blood', fasting: true },
  { id: 'iron', name: 'Iron Studies', description: 'Iron, ferritin & TIBC', price: 700, duration: '24 hours', sampleType: 'Blood', category: 'blood', fasting: true },

  // Hormone / Thyroid
  { id: 'thyroid', name: 'Thyroid Profile (T3,T4,TSH)', description: 'Thyroid hormone levels', price: 450, duration: '24 hours', sampleType: 'Blood', category: 'thyroid', fasting: true },
  { id: 'vitd', name: 'Vitamin D Test', description: 'Vitamin D level for bones & immunity', price: 800, duration: '24 hours', sampleType: 'Blood', category: 'vitamin', fasting: false },
  { id: 'vitb12', name: 'Vitamin B12 Test', description: 'B12 for nerves & blood cells', price: 600, duration: '24 hours', sampleType: 'Blood', category: 'vitamin', fasting: true },

  // Diabetes
  { id: 'hba1c', name: 'HbA1c', description: '3-month average blood sugar', price: 400, duration: '24 hours', sampleType: 'Blood', category: 'diabetes', fasting: false },
  { id: 'fbs', name: 'Fasting Blood Sugar (FBS)', description: 'Fasting glucose level', price: 100, duration: '2 hours', sampleType: 'Blood', category: 'diabetes', fasting: true },

  // Cardiac
  { id: 'lipid', name: 'Lipid Profile', description: 'Cholesterol & triglycerides', price: 500, duration: '12 hours', sampleType: 'Blood', category: 'cardiac', fasting: true },
  { id: 'cardiac', name: 'Cardiac Risk Markers', description: 'hs-CRP, homocysteine', price: 1200, duration: '24 hours', sampleType: 'Blood', category: 'cardiac', fasting: true },

  // Other categories (you can add more)
  { id: 'uric', name: 'Uric Acid Test', description: 'Gout & kidney stone risk', price: 250, duration: '6 hours', sampleType: 'Blood', category: 'blood', fasting: true },
  { id: 'psa', name: 'PSA (Prostate Specific Antigen)', description: 'Prostate health screening', price: 650, duration: '24 hours', sampleType: 'Blood', category: 'cancer', fasting: false },
  { id: 'ca125', name: 'CA-125', description: 'Ovarian cancer marker', price: 900, duration: '24 hours', sampleType: 'Blood', category: 'cancer', fasting: false },
  { id: 'crp', name: 'C-Reactive Protein (CRP)', description: 'Inflammation marker', price: 400, duration: '12 hours', sampleType: 'Blood', category: 'infection', fasting: false },
  { id: 'iga', name: 'IgE (Allergy Panel)', description: 'Allergy screening', price: 1200, duration: '48 hours', sampleType: 'Blood', category: 'allergy', fasting: false },
  { id: 'beta-hcg', name: 'Beta-hCG', description: 'Pregnancy confirmation', price: 350, duration: '6 hours', sampleType: 'Blood', category: 'pregnancy', fasting: false },
  { id: 'calcium', name: 'Calcium & Bone Profile', description: 'Bone health markers', price: 600, duration: '12 hours', sampleType: 'Blood', category: 'bone', fasting: true },
];

const labs = [
  { id: '1', name: 'Lab A', location: 'City A', rating: 4.5 },
  { id: '2', name: 'Lab B', location: 'City B', rating: 4.7 },
  { id: '3', name: 'Lab C', location: 'City C', rating: 4.2 },
  { id: '4', name: 'Lab D', location: 'City D', rating: 4.9 },
  { id: '5', name: 'Lab E', location: 'City E', rating: 4.6 },
  { id: '6', name: 'Lab F', location: 'City F', rating: 4.8 },
  { id: '7', name: 'Lab G', location: 'City G', rating: 4.3 },
  { id: '8', name: 'Lab H', location: 'City H', rating: 4.4 },
  { id: '9', name: 'Lab I', location: 'City I', rating: 4.1 },
  { id: '10', name: 'Lab J', location: 'City J', rating: 4.0 },
];

const CustomPackage = () => {
  const navigate = useNavigate();  // Fixed: useNavigate is now used (for potential navigation)
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTests, setFilteredTests] = useState(tests);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTestInfo, setSelectedTestInfo] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showLabSelection, setShowLabSelection] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);

  // Generate categories dynamically from tests array
  const categories = [
    { id: 'all', name: 'All Tests', count: tests.length },
    ...[...new Set(tests.map((test) => test.category))].map(cat => ({
      id: cat,
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: tests.filter(t => t.category === cat).length,
    })),
  ];

  // Filter tests when category or search changes
  useEffect(() => {
    let result = tests;

    if (activeCategory !== 'all') {
      result = result.filter(test => test.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(test =>
        test.name.toLowerCase().includes(q) ||
        test.description.toLowerCase().includes(q)
      );
    }

    setFilteredTests(result);
  }, [activeCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const q = query.toLowerCase();
      const results = tests
        .filter(test =>
          test.name.toLowerCase().includes(q) ||
          test.description.toLowerCase().includes(q)
        )
        .slice(0, 5);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (test) => {
    if (!selectedTests.includes(test.id)) {
      setSelectedTests([...selectedTests, test.id]);
    }
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleTestToggle = (testId: string) => {
    setSelectedTests(prev =>
      prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]
    );
  };

  const handleRemoveTest = (testId: string) => {
    setSelectedTests(prev => prev.filter(id => id !== testId));
  };

  const handleClearAll = () => {
    setSelectedTests([]);
  };

  const handleProceedNext = () => {
    if (selectedTests.length === 0) {
      alert('Please select at least one test');
      return;
    }
    setShowLabSelection(true);
  };

  const handleLabSelect = (lab) => {
    setSelectedLab(lab);
  };

  const handleBookTests = () => {
    if (!selectedLab) {
      alert('Please select a lab');
      return;
    }
    // Simulate booking - you can add actual logic here (e.g., add to cart)
    alert(`Tests booked at ${selectedLab.name}!`);
    setShowLabSelection(false);
    setSelectedTests([]);
  };

  const getRecommendations = () => {
    return tests
      .filter(test => !selectedTests.includes(test.id))
      .slice(0, 3)
      .map(test => ({
        ...test,
        reason: 'Commonly added with your selections',
      }));
  };

  const handleTestInfo = (test) => {
    setSelectedTestInfo(test);
    setShowInfoModal(true);
  };

  // Lab Selection Screen
  if (showLabSelection) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            Choose a Lab
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {labs.map(lab => (
              <div
                key={lab.id}
                onClick={() => handleLabSelect(lab)}
                className={`p-6 bg-white rounded-xl shadow-md border-2 cursor-pointer transition-all hover:shadow-lg ${
                  selectedLab?.id === lab.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{lab.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{lab.location}</p>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-sm font-medium">{lab.rating}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleBookTests}
              className={`px-10 py-4 rounded-xl font-bold text-white transition ${
                selectedLab
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!selectedLab}
            >
              Proceed to Book the Tests
            </button>

            <button
              onClick={() => setShowLabSelection(false)}
              className="px-10 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Page
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          Build Your Custom Health Package
        </h1>

        {/* Search */}
        <SearchBar
          onSearch={handleSearch}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />

        {/* Categories - no horizontal scroll, wraps on small screens */}
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {selectedTests.length > 0 && (
          <RecommendationSection
            recommendations={getRecommendations()}
            onAddTest={(test) => handleTestToggle(test.id)}
          />
        )}

        {/* Test Grid */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 lg:mb-0">
            {filteredTests.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-600 text-lg">
                No tests found matching your search or category.
              </div>
            ) : (
              filteredTests.map(test => (
                <TestCard
                  key={test.id}
                  test={test}
                  isSelected={selectedTests.includes(test.id)}
                  onToggle={() => handleTestToggle(test.id)}
                  onInfoClick={() => handleTestInfo(test)}
                />
              ))
            )}
          </div>

          {/* Sidebar - sticky on desktop */}
          <div className="lg:col-span-1 sticky top-24 self-start">
            <SelectedTestsSidebar
              selectedTests={selectedTests.map(id => tests.find(t => t.id === id))}
              onRemoveTest={handleRemoveTest}
              onClearAll={handleClearAll}
              onProceed={handleProceedNext}
            />
          </div>
        </div>
      </div>

      {/* Info Modal */}
      <TestInfoModal test={selectedTestInfo} isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />
    </div>
  );
};

export default CustomPackage;
