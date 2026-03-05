import { ArrowRight, Users } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

type GoalCardProps = {
  title: string;
  milestoneCount: number;
  tags: string[];
  onClick: () => void;
};

export function GoalCard({ title, milestoneCount, tags, onClick }: GoalCardProps) {
  return (
    <Card
      onClick={onClick}
      className="p-4 md:p-5 lg:p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-200 bg-white group active:scale-[0.98]"
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base md:text-lg font-medium text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug">
            {title}
          </h3>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
        </div>

        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-600">
          <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>{milestoneCount} 個のマイルストーン</span>
        </div>

        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
