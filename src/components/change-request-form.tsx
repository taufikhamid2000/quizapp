"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitChangeRequest } from "@/app/actions/change-request";
import { Spinner } from "@/components/spinner";

const FIELD_CLASS =
  "rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring";

// website (honeypot) is intentionally left out of validation — a filled
// value is checked server-side and never surfaced as a client error, so
// bots that fill it get a fake success instead of a hint to adjust.
const FormSchema = z.object({
  issue: z.string().min(10, "Please describe the issue in a bit more detail.").max(2000),
  suggestedFix: z.string().max(2000).optional(),
  reporterContact: z.string().max(200).optional(),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function ChangeRequestForm({
  subjectSlug,
  subjectName,
  topicSlug,
  topicName,
  questionId,
  questionText,
}: {
  subjectSlug: string;
  subjectName: string;
  topicSlug: string;
  topicName: string;
  questionId?: string;
  questionText?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(FormSchema) });

  const onSubmit = (values: FormValues) => {
    setErrorMessage(null);
    startTransition(async () => {
      const result = await submitChangeRequest({
        subjectSlug,
        subjectName,
        topicSlug,
        topicName,
        questionId,
        questionText,
        issue: values.issue,
        suggestedFix: values.suggestedFix,
        reporterContact: values.reporterContact,
        website: values.website,
      });
      if (result.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error);
      }
    });
  };

  if (status === "success") {
    return <p className="text-sm text-primary">Thanks — we&apos;ll take a look.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input
        {...register("website")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="cr-issue" className="text-xs font-medium text-foreground/60">
          What&apos;s wrong?
        </label>
        <textarea
          id="cr-issue"
          {...register("issue")}
          rows={3}
          placeholder="e.g. the marked correct answer is wrong, a typo, an unclear question…"
          className={FIELD_CLASS}
        />
        {errors.issue && <p className="text-xs text-destructive">{errors.issue.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cr-fix" className="text-xs font-medium text-foreground/60">
          Suggested fix (optional)
        </label>
        <textarea id="cr-fix" {...register("suggestedFix")} rows={2} className={FIELD_CLASS} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cr-contact" className="text-xs font-medium text-foreground/60">
          Email (optional, if you&apos;d like a reply)
        </label>
        <input id="cr-contact" {...register("reporterContact")} type="email" className={FIELD_CLASS} />
      </div>

      {status === "error" && errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending && <Spinner />}
        {isPending ? "Sending…" : "Submit report"}
      </button>
    </form>
  );
}
