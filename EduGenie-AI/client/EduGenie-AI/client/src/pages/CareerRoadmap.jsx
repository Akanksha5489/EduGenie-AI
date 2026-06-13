import { useMemo, useState } from 'react';
import {
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Loader2,
  Sparkles,
  Target,
  Wrench,
} from 'lucide-react';

const roadmapSections = [
  { key: 'careerOverview', title: 'Career Overview', icon: BriefcaseBusiness },
  { key: 'skillsToLearn', title: 'Required Skills', icon: GraduationCap },
  { key: 'toolsToMaster', title: 'Tools & Technologies', icon: Wrench },
  { key: 'projectsToBuild', title: 'Projects To Build', icon: Sparkles },
  { key: 'recommendedCourses', title: 'Learning Resources', icon: BookOpen },
  { key: 'interviewPreparation', title: 'Interview Preparation', icon: Target },
  { key: 'careerGrowthOpportunities', title: 'Career Opportunities', icon: BriefcaseBusiness },
  { key: 'salaryInsights', title: 'Industry Outlook', icon: GraduationCap },
];

function extractJson(text) {
  const cleaned = text.replace(/```json|```/gi, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error('Roadmap response was not valid JSON');
  }
}

function normalizeContent(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string' && value.trim()) return value.trim();
  return null;
}

function RoadmapCard({ section, content }) {
  const Icon = section.icon;
  const normalized = normalizeContent(content);

  if (!normalized) return null;

  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-900/75 p-5 shadow-lg shadow-slate-950/20">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-white">{section.title}</h2>
          {Array.isArray(normalized) ? (
            <ul className="mt-4 space-y-3">
              {normalized.map((item, index) => (
                <li key={`${section.key}-${index}`} className="flex gap-3 text-sm leading-6 text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-7 text-slate-300">{normalized}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default function CareerRoadmap() {
  const [careerGoal, setCareerGoal] = useState('');
  const [roadmap, setRoadmap] = useState(null);
  const [rawRoadmap, setRawRoadmap] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState(1);
  const canGenerate = useMemo(() => careerGoal.trim().length > 1 && !isLoading, [careerGoal, isLoading]);

  const handleGenerate = async (event) => {
    event.preventDefault();
    const goal = careerGoal.trim();

    if (!goal) {
      setError('Enter a career goal to generate your roadmap.');
      return;
    }

    setIsLoading(true);
    setError('');
    setRoadmap(null);
    setRawRoadmap('');

    const prompt = `
Create a personalized career roadmap for: ${goal}

Requirements:
- Create a realistic roadmap for this exact career goal.
- Focus on learning progression from beginner to job-ready or practice-ready.
- Include actionable steps, projects, resources, interview preparation, career growth path, and salary insights.
- Make recommendations useful for a student.
- Return structured JSON only with the exact keys requested by the system prompt.
`;

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, mode: 'career-roadmap' }),
      });

      if (!response.ok) throw new Error('Unable to generate roadmap right now.');

      const data = await response.json();
      const reply = data?.reply?.trim();
      if (!reply) throw new Error('The AI returned an empty roadmap.');

      try {
  setRoadmap(extractJson(reply));
setView(1);
} catch {
  setRawRoadmap(reply);
}
    } catch (err) {
      setError(err.message || 'Something went wrong while generating your roadmap.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/80 p-6 shadow-2xl shadow-slate-950/40">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Career Roadmap</p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Career Roadmap Generator
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
                Describe your dream career and get a personalized learning roadmap.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">AI powered</p>
              <p className="mt-2 text-sm font-semibold text-cyan-100">Get a structured learning path, resources, projects, and career guidance.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-slate-900/70 p-6">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label htmlFor="careerGoal" className="text-sm font-semibold text-white">
                What career do you want to pursue?
              </label>
              <div className="mt-3 flex flex-col gap-3 lg:flex-row">
                <input
                  id="careerGoal"
                  type="text"
                  value={careerGoal}
                  onChange={(event) => setCareerGoal(event.target.value)}
                  placeholder="Example: AI Engineer, Doctor, Fashion Designer"
                  className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/10"
                />
                <button
                  type="submit"
                  disabled={!canGenerate}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Generate Roadmap
                </button>
              </div>
            </div>

          </form>
        </section>

        {isLoading && (
          <section className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="flex items-center gap-3 text-cyan-100">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p className="text-sm font-semibold">Generating your personalized roadmap...</p>
            </div>
          </section>
        )}

        {error && (
          <section className="rounded-[28px] border border-rose-300/20 bg-rose-400/10 p-5 text-sm text-rose-100">
            {error}
          </section>
        )}

        {roadmap && view === 1 && (

  <section className="rounded-[32px] border border-white/10 bg-slate-900/75 p-8">


<RoadmapCard
  section={{ title: 'Career Overview', icon: BriefcaseBusiness }}
  content={roadmap.careerOverview}
/>

<div className="mt-4">
  <RoadmapCard
    section={{ title: 'Industry Outlook', icon: GraduationCap }}
    content={roadmap.salaryInsights}
  />
</div>

<button
  onClick={() => setView(2)}
  className="mt-6 rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950"
>
  Continue Learning Path →
</button>


  </section>
)}

{roadmap && view === 2 && (

  <div className="space-y-4">


<button
  onClick={() => setView(1)}
  className="rounded-2xl border border-white/10 px-5 py-2 text-sm"
>
  ← Back to Overview
</button>

<div className="grid gap-4 md:grid-cols-2">

  <RoadmapCard
    section={{ title: 'Required Skills', icon: GraduationCap }}
    content={roadmap.skillsToLearn}
  />

  <RoadmapCard
    section={{ title: 'Tools & Technologies', icon: Wrench }}
    content={roadmap.toolsToMaster}
  />
  </div>

  <div className="flex justify-end">
  <button
    onClick={() => setView(3)}
    className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950"
  >
    Continue Projects →
  </button>
</div>

</div>

)}

{roadmap && view === 3 && (

  <div className="space-y-4">


<button
  onClick={() => setView(2)}
  className="rounded-2xl border border-white/10 px-5 py-2 text-sm"
>
  ← Back
</button>

<div className="grid gap-4 md:grid-cols-2">

  <RoadmapCard
    section={{ title: 'Projects To Build', icon: Sparkles }}
    content={roadmap.projectsToBuild}
  />

  <RoadmapCard
    section={{ title: 'Learning Resources', icon: BookOpen }}
    content={roadmap.recommendedCourses}
  />

  <RoadmapCard
    section={{ title: 'Interview Preparation', icon: Target }}
    content={roadmap.interviewPreparation}
  />

  <RoadmapCard
    section={{ title: 'Career Opportunities', icon: BriefcaseBusiness }}
    content={roadmap.careerGrowthOpportunities}
  />

</div>


  </div>

)}

</div>
    </main>
  );
}