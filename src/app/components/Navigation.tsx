import { BookOpen, PlusCircle, Search } from "lucide-react";
import { Button } from "./ui/button";

type NavigationProps = {
  onNavigate: (page: string) => void;
  currentPage: string;
};

export function Navigation({ onNavigate, currentPage }: NavigationProps) {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-1.5 md:gap-2 text-base md:text-lg font-medium text-indigo-900 hover:text-indigo-700 transition-colors"
          >
            <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
            <span className="hidden sm:inline">Learning Milestones</span>
            <span className="sm:hidden">LM</span>
          </button>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => onNavigate("create")}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm h-8 md:h-9 px-3 md:px-4"
            >
              <PlusCircle className="w-3.5 h-3.5 md:w-4 md:h-4 md:mr-2" />
              <span className="hidden md:inline">マイルストーンを作成</span>
              <span className="md:hidden ml-1">作成</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
