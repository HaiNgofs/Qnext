/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { JOB_POSITIONS } from '../data';
import { JobPosition } from '../types';
import { Briefcase, MapPin, DollarSign, Calendar, FileText, CheckCircle, Plus, ChevronDown, ChevronUp, X, Upload, Send, AlertCircle, Trash2 } from 'lucide-react';
import careerTeamImg from '../assets/images/career_team_1780992385038.png';
import { safeStorage } from '../utils';

export default function CareerSection() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [expandedPositionId, setExpandedPositionId] = useState<string | null>('tiktok-seller');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [modalJob, setModalJob] = useState<JobPosition | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [salaryExpectation, setSalaryExpectation] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [cvFile, setCvFile] = useState<{ name: string; size: string } | null>(null);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submissions saved state
  const [submittedApplications, setSubmittedApplications] = useState<any[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = safeStorage.getItem('qnext_applications');
    if (saved) {
      try {
        setSubmittedApplications(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading applications:', err);
      }
    }
  }, []);

  const handleApplyClick = (job: JobPosition, e: React.MouseEvent) => {
    e.stopPropagation();
    setModalJob(job);
    setIsApplyModalOpen(true);
    setFormError('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setCvFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCvFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      });
    }
  };

  const clearForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setCoverLetter('');
    setSalaryExpectation('');
    setCvFile(null);
    setFormError('');
    setModalJob(null);
    setIsApplyModalOpen(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !salaryExpectation.trim()) {
      setFormError('Please fill out all required fields.');
      return;
    }

    if (!cvFile) {
      setFormError('Please upload your CV / Resume.');
      return;
    }

    setIsSubmitting(true);

    // Simulate upload delay
    setTimeout(() => {
      const newApp = {
        id: `app_${Date.now()}`,
        jobTitle: modalJob?.title || 'Unknown Position',
        jobDepartment: modalJob?.department || 'Operations',
        fullName,
        email,
        phone,
        salaryExpectation,
        cvName: cvFile.name,
        cvSize: cvFile.size,
        coverLetter,
        submittedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updated = [newApp, ...submittedApplications];
      setSubmittedApplications(updated);
      safeStorage.setItem('qnext_applications', JSON.stringify(updated));

      setIsSubmitting(false);
      clearForm();
    }, 1500);
  };

  const handleDeleteApplication = (id: string) => {
    const updated = submittedApplications.filter(app => app.id !== id);
    setSubmittedApplications(updated);
    safeStorage.setItem('qnext_applications', JSON.stringify(updated));
  };

  return (
    <section id="careers" className="py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hub Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Join Qnext Team</span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tighter">
            Careers Hub &amp; Active Openings
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">
            We are actively expanding our cross-border operations at Gems Office, Hanoi. High commission caps, professional US-market workspace, and premium tool ecosystems.
          </p>
        </div>

        {/* Careers workspace banner image */}
        <div className="max-w-4xl mx-auto mb-12 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative group">
          <img 
            src={careerTeamImg} 
            alt="Qnext Creative Career Team Hanoi" 
            className="w-full h-64 sm:h-80 object-cover group-hover:scale-102 transition-transform duration-700 ease-in-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1 text-left">
              <span className="text-[10px] uppercase font-mono font-black bg-blue-650 text-white px-2.5 py-0.5 rounded tracking-wider">Hanoi Hub</span>
              <h3 className="font-sans font-extrabold text-lg sm:text-xl text-white">Collaborative Innovation Workspace</h3>
              <p className="text-xs text-slate-300 max-w-lg">Work with specialized teams building high-yielding US social commerce stores.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-white text-xs space-y-1 self-start sm:self-auto text-left sm:text-center">
              <div className="font-mono font-bold text-blue-400">BENEFITS</div>
              <p className="text-[11px] text-slate-200">Equipment + Lunch + Bonus</p>
            </div>
          </div>
        </div>

        {/* Main Job listings flow */}
        <div className="max-w-4xl mx-auto space-y-4" id="positions-accordion">
          {JOB_POSITIONS.map((job) => {
            const isExpanded = expandedPositionId === job.id;
            return (
              <div
                key={job.id}
                id={`job-card-${job.id}`}
                onClick={() => setExpandedPositionId(isExpanded ? null : job.id)}
                className={`bg-white dark:bg-slate-900 border rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                  isExpanded
                    ? 'border-blue-600 dark:border-blue-500 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-305 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                
                {/* Accordion Trigger row */}
                <div className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div className="space-y-1.5 font-sans">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-200/40 dark:border-slate-700/50">
                        {job.department}
                      </span>
                      <span className="text-[10px] uppercase font-mono font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-105">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="font-sans font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mt-0.5">
                      {job.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <DollarSign className="w-3.5 h-3.5" />
                        {job.salary}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-end">
                    <button
                      id={`apply-inline-btn-${job.id}`}
                      onClick={(e) => handleApplyClick(job, e)}
                      className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-400 text-xs font-bold uppercase py-2.5 px-4 rounded-xl transition-all cursor-pointer"
                    >
                      Apply Now
                    </button>
                    <div className="text-slate-405 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded detailing shelf */}
                {isExpanded && (
                  <div 
                    id={`details-shelf-${job.id}`}
                    onClick={(e) => e.stopPropagation()} 
                    className="px-6 pb-8 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-6 bg-slate-50/50 dark:bg-slate-950/40 text-xs sm:text-sm"
                  >
                    
                    {/* Intro Description */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-zinc-400">Position Summary</span>
                      <p className="text-zinc-650 dark:text-zinc-350 leading-relaxed">
                        {job.description}
                      </p>
                    </div>

                    {/* Split details columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Responsibilities */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase text-zinc-400 block pb-1 border-b border-zinc-150 dark:border-zinc-800">
                          Primary Responsibilities
                        </span>
                        <ul className="space-y-1.5">
                          {job.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2 text-zinc-605 dark:text-zinc-400 leading-relaxed text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white mt-1.5 shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase text-zinc-400 block pb-1 border-b border-zinc-150 dark:border-zinc-800">
                          Candidate Requirements
                        </span>
                        <ul className="space-y-1.5">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-zinc-605 dark:text-zinc-400 leading-relaxed text-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white mt-1.5 shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Benefits Package */}
                    <div className="space-y-2 pt-4 border-t border-zinc-150 dark:border-zinc-800">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 block pb-1">
                        Benefits & Work Ecosystem
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {job.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-white dark:bg-zinc-850 rounded-lg border border-zinc-200/50 dark:border-zinc-800 text-xs">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span className="text-zinc-700 dark:text-zinc-300 font-medium">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom rapid apply block */}
                    <div className="flex justify-end pt-4">
                      <button
                        id={`apply-bottom-btn-${job.id}`}
                        onClick={(e) => handleApplyClick(job, e)}
                        className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold uppercase text-xs tracking-wider px-6 py-3 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all cursor-pointer shadow"
                      >
                        Submit Application for this position
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Existing submissions display area */}
        {submittedApplications.length > 0 && (
          <div id="user-applications-log" className="max-w-4xl mx-auto mt-16 pt-12 border-t border-zinc-200/50 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-sans font-bold text-lg text-zinc-950 dark:text-white">
                  Your Application History
                </h3>
                <p className="text-xs text-zinc-500">
                  These submissions are saved locally on your browser&apos;s cache space. Our HR evaluates matches fast!
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-2 py-1 rounded">
                {submittedApplications.length} Submission{submittedApplications.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-4">
              {submittedApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-550 dark:text-zinc-400 px-2 py-0.5 rounded">
                        {app.jobDepartment}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400">{app.submittedAt}</span>
                    </div>
                    <h4 className="font-sans font-bold text-sm text-zinc-900 dark:text-white">
                      {app.jobTitle}
                    </h4>
                    <p className="text-xs text-zinc-500">
                      Applicant: <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{app.fullName}</span> ({app.email})
                    </p>
                    <div className="flex items-center gap-1 text-xs text-zinc-400 pt-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span className="underline truncate max-w-xs">{app.cvName}</span>
                      <span className="text-[10px]">({app.cvSize})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-955/20 px-2.5 py-1.5 rounded-lg border border-amber-100 dark:border-amber-950/40">
                      Processing
                    </span>
                    <button
                      id={`delete-app-btn-${app.id}`}
                      onClick={() => handleDeleteApplication(app.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                      title="Withdraw application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* High-Fidelity HR Application Modal */}
      {isApplyModalOpen && modalJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop screen shade */}
          <div 
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={clearForm}
          />

          {/* Modal Container */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl transition-all duration-300">
            
            {/* Header Area */}
            <div className="p-6 border-b border-zinc-150 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 sticky top-0 z-10">
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-400">Application File</span>
                <h3 className="font-sans font-extrabold text-base sm:text-lg text-zinc-950 dark:text-white">
                  Apply for {modalJob.title}
                </h3>
                <span className="text-[11px] font-mono text-zinc-450 dark:text-zinc-500 block">
                  {modalJob.department} &bull; {modalJob.location}
                </span>
              </div>
              <button
                id="close-apply-modal"
                onClick={clearForm}
                className="p-1.5 text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmitApplication} className="p-6 space-y-5">
              
              {formError && (
                <div className="p-3 bg-red-50 dark:bg-red-955/20 border border-red-150 dark:border-red-900/40 rounded-xl text-xs text-red-700 dark:text-red-400 flex items-start gap-2">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-950 dark:focus:border-white focus:ring-1 focus:ring-zinc-950 font-sans"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-950 dark:focus:border-white focus:ring-1 focus:ring-zinc-950 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Contact Phone */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., +84 xxx xxx xxx"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-950 dark:focus:border-white focus:ring-1 focus:ring-zinc-950 font-sans"
                  />
                </div>

                {/* Salary Aspirations */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Salary Expectation (Net) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={salaryExpectation}
                    onChange={(e) => setSalaryExpectation(e.target.value)}
                    placeholder="e.g., $1,200 Net or negotiable"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-950 dark:focus:border-white focus:ring-1 focus:ring-zinc-950 font-sans"
                  />
                </div>
              </div>

              {/* Upload Drag & Drop Area */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Attach CV / Resume (PDF, DOCX) <span className="text-red-500">*</span>
                </label>
                
                <div
                  id="cv-drag-drop"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-zinc-950 dark:border-white bg-zinc-50 dark:bg-zinc-900/60'
                      : cvFile
                      ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-955/5'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-750'
                  }`}
                >
                  <input
                    type="file"
                    id="file-input"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file-input" className="cursor-pointer space-y-2 block w-full">
                    {cvFile ? (
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 rounded-xl text-emerald-600 dark:text-emerald-400">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <span className="text-sm font-bold text-zinc-900 dark:text-white truncate max-w-[250px]">
                          {cvFile.name}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">
                          File successfully loaded ({cvFile.size})
                        </span>
                        <span className="text-[10px] text-zinc-400 underline mt-1 block">
                          Click or drag is still active to swap files
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2 flex flex-col items-center">
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-xl text-zinc-400">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
                            Drag & Drop CV file here
                          </span>
                          <span className="text-[11px] text-zinc-400 block mt-0.5">
                            Or click to load from local file explorer
                          </span>
                        </div>
                        <span className="text-[9px] text-zinc-400 font-mono">
                          Supports PDF, DOCX up to 10MB
                        </span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Introduce Yourself / Cover Letter (Optional)
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell us about yourself, your career goals, and why you would love to work with Qnext..."
                  rows={4}
                  className="w-full text-xs p-3 rounded-xl border border-zinc-200 dark:border-zinc-850 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-950 dark:focus:border-white focus:ring-1 focus:ring-zinc-950 font-sans resize-none"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-4 border-t border-zinc-150 dark:border-zinc-800">
                <button
                  type="button"
                  id="cancel-apply-modal"
                  onClick={clearForm}
                  className="flex-1 text-center py-3 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-300 font-bold uppercase text-[11px] tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-apply-form"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-bold uppercase text-[11px] tracking-wider rounded-xl transition-all shadow cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Submit Application
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
}
