import { Clock, User } from "lucide-react";
import { Card } from "./ui/card";
import { ResourceCard } from "./ResourceCard";

type Resource = {
  id: string;
  type: "book" | "paper" | "article" | "website" | "github" | "video";
  title: string;
  description?: string;
  url?: string;
};

type MilestoneCardProps = {
  title: string;
  author: string;
  estimatedTime: string;
  resources: Resource[];
};

export function MilestoneCard({ title, author, estimatedTime, resources }: MilestoneCardProps) {
  return (
    <Card className="p-4 md:p-5 lg:p-6 bg-white border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="mb-4 md:mb-5 lg:mb-6">
        <h3 className="text-base md:text-lg lg:text-xl font-medium text-gray-900 mb-2 md:mb-3 leading-snug">{title}</h3>
        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600">
          <div className="flex items-center gap-1 md:gap-1.5">
            <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1 md:gap-1.5">
            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>{estimatedTime}</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="ml-0 md:ml-1 lg:ml-2">
        {resources.map((resource, index) => (
          <ResourceCard
            key={resource.id}
            type={resource.type}
            title={resource.title}
            description={resource.description}
            url={resource.url}
            showConnector={index < resources.length - 1}
          />
        ))}
      </div>
    </Card>
  );
}
