import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Radio, Activity, Gamepad2, Database, Wrench, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductTourModal: React.FC<ProductTourModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: '1. DJ Software Connection',
      subtitle: 'Universal connection layer across modern DJ platforms',
      icon: <Radio className="w-6 h-6 text-brand-forest dark:text-app-accent" />,
      content:
        'OmniBeat Universal provides a unified connection layer. In the DJ Connections section, view the active VirtualDJ Beta integration and explore honest feasibility breakdowns for Serato DJ Pro, rekordbox, and Engine DJ.',
      route: '/app/connect',
      actionLabel: 'View DJ Connections'
    },
    {
      title: '2. Low-Latency Track Detection',
      subtitle: 'Solving the 45-second history delay problem',
      icon: <Activity className="w-6 h-6 text-brand-forest dark:text-app-accent" />,
      content:
        'In Live Detection, observe the proposed event-driven playback pipeline. Click any song from the playlist to trigger detection events and compare target 1.8-second detection against the 45-second legacy file delay.',
      route: '/app/live',
      actionLabel: 'Explore Live Detection'
    },
    {
      title: '3. Omni-Bingo Game Routing & Manual Override',
      subtitle: 'Independent gameplay continuity',
      icon: <Gamepad2 className="w-6 h-6 text-brand-forest dark:text-app-accent" />,
      content:
        'Select which active Omni-Bingo game receives track metadata. Toggle the OmniDrop Manual Override switch at any time to preserve DJ automation separation without affecting manual host operations.',
      route: '/app/games',
      actionLabel: 'Inspect Game Routing'
    },
    {
      title: '4. Normalized Metadata Transmission',
      subtitle: 'Unified JSON payloads for entertainment systems',
      icon: <Database className="w-6 h-6 text-brand-forest dark:text-app-accent" />,
      content:
        'In Event Activity, review all normalized song events, filter by delivery status (Delivered, Pending, Duplicate Prevented), inspect full JSON payloads, and copy payloads to your clipboard.',
      route: '/app/activity',
      actionLabel: 'Open Event Activity'
    },
    {
      title: '5. Built-In Reliability & Diagnostics',
      subtitle: 'Engineered for live venue realities',
      icon: <Wrench className="w-6 h-6 text-brand-forest dark:text-app-accent" />,
      content:
        'Test connection resiliency using the Diagnostic self-test or trigger a simulated network drop to see automatic socket recovery, queue reconciliation, and duplicate suppression in action.',
      route: '/app/diagnostics',
      actionLabel: 'Run Diagnostics'
    }
  ];

  if (!isOpen) return null;

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleJumpToSection = () => {
    navigate(step.route);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Interactive Product Tour"
      subtitle={`Step ${currentStep + 1} of ${steps.length} • OmniBeat Universal Walkthrough`}
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        {/* Step Indicator dots */}
        <div className="flex items-center gap-1.5 justify-center">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentStep
                  ? 'w-6 bg-brand-forest dark:bg-app-accent'
                  : 'w-2 bg-brand-stone dark:bg-app-elevated'
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="text-center space-y-3 px-2">
          <div className="w-12 h-12 rounded-xl bg-brand-sageLight dark:bg-app-elevated border border-brand-sage/40 dark:border-app-border flex items-center justify-center mx-auto shadow-sm">
            {step.icon}
          </div>
          <h4 className="text-base font-bold font-heading text-brand-charcoal dark:text-app-text">
            {step.title}
          </h4>
          <p className="text-xs font-medium text-brand-forest dark:text-app-accent">
            {step.subtitle}
          </p>
          <p className="text-xs text-brand-muted dark:text-app-muted leading-relaxed max-w-sm mx-auto">
            {step.content}
          </p>
        </div>

        {/* Jump to section action */}
        <div className="text-center">
          <button
            onClick={handleJumpToSection}
            className="text-xs font-semibold text-brand-forest dark:text-app-accent hover:underline inline-flex items-center gap-1"
          >
            <span>{step.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-border dark:border-app-border">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed text-brand-muted'
                : 'text-brand-charcoal dark:text-app-text hover:bg-brand-stone/40 dark:hover:bg-app-elevated'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-forest text-brand-surface dark:bg-app-accent dark:text-app-bg text-xs font-bold hover:bg-brand-forestDark dark:hover:bg-app-accentHover transition-colors shadow-sm"
          >
            <span>{currentStep === steps.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
            {currentStep === steps.length - 1 ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

