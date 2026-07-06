import {
  Database,
  Cpu,
  Zap,
} from "lucide-react";

export interface Feature {
  icon: React.ElementType;

  title: string;

  description: string;

  badge: string;

  accent: "blue" | "purple" | "green";
  step? : string;
}

export const features: Feature[] = [
  {
    icon: Database,
    title: "Ingest Data",
    description:
      "Connect any source — databases, streams, APIs, files. Schema inference and normalization happen automatically, with zero-config connectors.",
    badge: "200+ connectors",
    accent: "blue",
  },

  {
    icon: Cpu,
    title: "Analyze with AI",
    description:
      "Distributed inference runs across your data in parallel. Pattern detection, anomaly scoring, and semantic enrichment at pipeline speed.",
    badge: "< 50ms latency",
    accent: "purple",
  },

  {
    icon: Zap,
    title: "Generate Insight",
    description:
      "Structured results surface as queryable tables, live dashboards, and API endpoints — ready for downstream automation or human review.",
    badge: "Real time output",
    accent: "green",
  },
];