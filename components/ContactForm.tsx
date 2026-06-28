"use client";

import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
import { budgetRanges, projectTypes } from "@/data/site";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<"name" | "email" | "projectType" | "budget" | "description", string>>;

const initialState = {
  name: "",
  company: "",
  email: "",
  projectType: "",
  budget: "",
  description: ""
};

export function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const emailIsValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email), [values.email]);

  const updateValue = (field: keyof typeof initialState, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  const validate = () => {
    const nextErrors: FieldErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Name is required.";
    }
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailIsValid) {
      nextErrors.email = "Use a valid email address.";
    }
    if (!values.projectType) {
      nextErrors.projectType = "Choose a project type.";
    }
    if (!values.budget) {
      nextErrors.budget = "Choose a budget range.";
    }
    if (values.description.trim().length < 20) {
      nextErrors.description = "Tell Zac a little more about the project.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setSubmitted(true);
    setValues(initialState);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid gap-4 border-[4px] border-ink bg-cream p-4 shadow-brutal lg:grid-cols-2 lg:p-6"
    >
      <TextField
        label="Name"
        value={values.name}
        error={errors.name}
        required
        onChange={(value) => updateValue("name", value)}
      />
      <TextField label="Company" value={values.company} onChange={(value) => updateValue("company", value)} />
      <TextField
        label="Email"
        type="email"
        value={values.email}
        error={errors.email}
        required
        onChange={(value) => updateValue("email", value)}
      />
      <SelectField
        label="Project type"
        value={values.projectType}
        error={errors.projectType}
        required
        options={projectTypes}
        onChange={(value) => updateValue("projectType", value)}
      />
      <SelectField
        label="Budget"
        value={values.budget}
        error={errors.budget}
        required
        options={budgetRanges}
        onChange={(value) => updateValue("budget", value)}
      />
      <label className="grid gap-2 lg:col-span-2">
        <span className="font-display text-lg uppercase">Project description</span>
        <textarea
          required
          minLength={20}
          value={values.description}
          onChange={(event) => updateValue("description", event.target.value)}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
          className={inputClassName(Boolean(errors.description), "min-h-40 resize-y")}
        />
        {errors.description ? <FieldError id="description-error">{errors.description}</FieldError> : null}
      </label>

      <div className="flex flex-col gap-4 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center gap-3 border-[3px] border-ink bg-coral px-5 py-3 font-display text-sm uppercase shadow-brutal-sm transition hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_#212026] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue"
        >
          Send message
          <Send size={18} aria-hidden="true" />
        </button>
        {submitted ? (
          <p className="border-[3px] border-ink bg-orange px-4 py-3 font-display text-xl uppercase leading-none shadow-brutal-sm" role="status">
            MESSAGE RECEIVED.
            <br />
            GOOD BEHAVIOUR CANNOT BE GUARANTEED.
          </p>
        ) : null}
      </div>
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: "text" | "email";
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${id}-error`;

  return (
    <label className="grid gap-2">
      <span className="font-display text-lg uppercase">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={inputClassName(Boolean(error))}
      />
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  error,
  required = false
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${id}-error`;

  return (
    <label className="grid gap-2">
      <span className="font-display text-lg uppercase">{label}</span>
      <select
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={inputClassName(Boolean(error))}
      >
        <option value="">Choose one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </label>
  );
}

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <span id={id} className="font-mono text-xs uppercase text-ink">
      {children}
    </span>
  );
}

function inputClassName(hasError: boolean, extra?: string) {
  return cn(
    "w-full border-[3px] border-ink bg-cream px-3 py-3 text-base font-bold outline-none transition focus-visible:bg-mint focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-coral",
    hasError && "bg-pink/25",
    extra
  );
}
