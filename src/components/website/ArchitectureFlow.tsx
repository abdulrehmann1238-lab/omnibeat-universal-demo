import React, { useState } from 'react';
import {
  Radio,
  Cpu,
  Layers,
  Server,
  Cloud,
  Gamepad2,
  Play,
  CheckCircle2,
  ArrowRight,
  Info,
  Sparkles
} from 'lucide-react';

interface ArchitectureNode {
  id: string;
  name: string;
  shortRole: string;
  description: string;
  icon: React.ReactNode;
}

export const ArchitectureFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isRunningFlow, setIsRunningFlow] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);
  const [flowStatusText, setFlowStatusText] = useState<string>('Ready to test live flow.');

  const nodes: ArchitectureNode[] = [
    {
      id: 'node-1',
      name: 'DJ Software',
      shortRole: 'Source Environment',
      description: 'The selected DJ application (e.g. VirtualDJ) or compatible hardware controller broadcasting deck status.',
      icon: <Radio className="w-5 h-5" />
    },
    {
      id: 'node-2',
      name: 'OmniBeat Universal',
      shortRole: 'Local Desktop Layer',
      description: 'The cross-platform desktop connection layer managing source selection, latency optimization, and IPC loopback.',
      icon: <Cpu className="w-5 h-5" />
    },
    {
      id: 'node-3',
      name: 'Metadata Normalization',
      shortRole: 'Unified Schema Engine',
      description: 'A common representation of track title, artist, source deck, BPM, and event timestamp regardless of source software.',
      icon: <Layers className="w-5 h-5" />
    },
    {
      id: 'node-4',
      name: 'OmniBeat API',
      shortRole: 'Authenticated Backend',
      description: 'The secure ingestion and routing layer verifying event origin, session tokens, and deduplication logic.',
      icon: <Server className="w-5 h-5" />
    },
    {
      id: 'node-5',
      name: 'OmniDrop Gateway',
      shortRole: 'Live Event Pipeline',
      description: 'The existing gameplay ingestion gateway, preserving host manual override functionality without event collision.',
      icon: <Cloud className="w-5 h-5" />
    },
    {
      id: 'node-6',
      name: 'Omni-Bingo Game',
      shortRole: 'Live Interactive Display',
      description: 'The destination active entertainment game highlighting matched squares on players’ live devices.',
      icon: <Gamepad2 className="w-5 h-5" />
    }
  ];

  const handleRunDemoFlow = async () => {
    if (isRunningFlow) return;
    setIsRunningFlow(true);
    setActiveStep(0);
    setFlowStatusText('1/6: DJ Software cued "Midnight City" by M83 on Deck 1.');

    await new Promise((r) => setTimeout(r, 700));
    setActiveStep(1);
    setFlowStatusText('2/6: OmniBeat Universal intercepted playback event in 1.8s.');

    await new Promise((r) => setTimeout(r, 700));
    setActiveStep(2);
    setFlowStatusText('3/6: Normalized metadata payload generated [OB-2026-000128].');

    await new Promise((r) => setTimeout(r, 700));
    setActiveStep(3);
    setFlowStatusText('4/6: Authenticated delivery through OmniBeat API endpoint.');

    await new Promise((r) => setTimeout(r, 700));
    setActiveStep(4);
    setFlowStatusText('5/6: OmniDrop Gateway received event & validated manual override state.');

    await new Promise((r) => setTimeout(r, 700));
    setActiveStep(5);
    setFlowStatusText('6/6: Omni-Bingo Game (Session FB-2026-014) updated. 42 players active!');

    await new Promise((r) => setTimeout(r, 1000));
    setIsRunningFlow(false);
  };

  return (
    <section id="how-it-works" className="py-24 bg-brand-surface border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-brand-forest mb-2 block">
            ARCHITECTURE & PIPELINE
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
            One connection. Three essential stages.
          </h2>
          <p className="text-sm text-brand-muted mt-3 leading-relaxed">
            From the local DJ software deck through normalization and the OmniDrop gateway to the active Omni-Bingo game.
          </p>
        </div>

        {/* Interactive Runner Trigger Bar */}
        <div className="max-w-xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-xl bg-brand-ivory border border-brand-border gap-3">
          <div className="flex items-center gap-2.5 text-xs text-brand-charcoal">
            <Sparkles className="w-4 h-4 text-brand-forest flex-shrink-0" />
            <span className="font-mono text-[11px] truncate">{flowStatusText}</span>
          </div>

          <button
            onClick={handleRunDemoFlow}
            disabled={isRunningFlow}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-ivory text-xs font-bold transition-all shadow-sm disabled:opacity-50 flex-shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunningFlow ? 'Processing Flow...' : 'Run Demo Flow'}</span>
          </button>
        </div>

        {/* 6-Node Architecture Pipeline Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 relative">
          {nodes.map((node, index) => {
            const isActive = activeStep === index;
            const isCompleted = activeStep > index;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`group relative p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? 'bg-brand-sageLight border-brand-forest ring-2 ring-brand-forest/30 shadow-md scale-105 z-10'
                    : isCompleted
                    ? 'bg-brand-ivory border-brand-sage/60 text-brand-charcoal'
                    : 'bg-brand-ivory/60 border-brand-border hover:border-brand-sage/50 text-brand-charcoal'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isActive
                          ? 'bg-brand-forest text-brand-surface'
                          : 'bg-brand-surface text-brand-charcoal border border-brand-border'
                      }`}
                    >
                      {node.icon}
                    </div>
                    <span className="font-mono text-[10px] font-bold text-brand-muted">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xs text-brand-charcoal mb-1">
                    {node.name}
                  </h3>
                  <div className="text-[10px] text-brand-forest font-semibold mb-2">
                    {node.shortRole}
                  </div>
                </div>

                <div className="pt-2 border-t border-brand-border/60 text-[10px] text-brand-muted line-clamp-2">
                  {node.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Details Drawer/Card */}
        {selectedNode && (
          <div className="mt-8 p-5 rounded-2xl bg-brand-ivory border border-brand-sage/40 max-w-2xl mx-auto shadow-sm flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-brand-charcoal">
                  {selectedNode.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-sageLight text-brand-forest font-semibold">
                  {selectedNode.shortRole}
                </span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                {selectedNode.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs text-brand-muted hover:text-brand-charcoal font-semibold"
            >
              Close
            </button>
          </div>
        )}

        {/* Label note */}
        <p className="text-[11px] text-center text-brand-muted mt-8 font-mono">
          Interactive Architecture Flow • Simulated demonstration of proposed end-to-end telemetry pipeline
        </p>
      </div>
    </section>
  );
};

