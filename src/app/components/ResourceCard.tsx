import { BookOpen, FileText, Globe, Github, PlayCircle, ExternalLink } from "lucide-react";

type ResourceType = "book" | "paper" | "article" | "website" | "github" | "video";

type ResourceCardProps = {
  type: ResourceType;
  title: string;
  description?: string;
  url?: string;
  showConnector?: boolean;
};

const iconMap: Record<ResourceType, React.ReactNode> = {
  book: <BookOpen className="w-5 h-5" />,
  paper: <FileText className="w-5 h-5" />,
  article: <FileText className="w-5 h-5" />,
  website: <Globe className="w-5 h-5" />,
  github: <Github className="w-5 h-5" />,
  video: <PlayCircle className="w-5 h-5" />,
};

const typeLabel: Record<ResourceType, string> = {
  book: "書籍",
  paper: "論文",
  article: "記事",
  website: "ウェブサイト",
  github: "GitHub",
  video: "動画",
};

export function ResourceCard({ type, title, description, url, showConnector = true }: ResourceCardProps) {
  return (
    <div className="relative">
      <div className="flex gap-2.5 md:gap-3 lg:gap-4">
        {/* Timeline node */}
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 flex-shrink-0 z-10">
            <div className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5">
              {iconMap[type]}
            </div>
          </div>
          {showConnector && (
            <div className="w-0.5 h-full bg-indigo-200 mt-1.5 md:mt-2" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-5 md:pb-6 lg:pb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-3.5 lg:p-4 hover:shadow-md transition-all group active:scale-[0.99]">
            <div className="flex items-start justify-between gap-2 md:gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                  <span className="text-[10px] md:text-xs font-medium text-indigo-600 uppercase tracking-wide">
                    {typeLabel[type]}
                  </span>
                </div>
                <h4 className="font-medium text-sm md:text-base text-gray-900 mb-0.5 md:mb-1 group-hover:text-indigo-700 transition-colors leading-snug">
                  {title}
                </h4>
                {description && (
                  <p className="text-xs md:text-sm text-gray-600 line-clamp-2 leading-relaxed">{description}</p>
                )}
              </div>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-600 transition-colors flex-shrink-0 p-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
