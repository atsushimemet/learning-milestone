import { useState } from "react";
import { TrendingUp, Tag } from "lucide-react";
import { GoalCard } from "./GoalCard";
import { Badge } from "./ui/badge";

type HomePageProps = {
  onGoalClick: (goalId: string) => void;
};

const trendingGoals = [
  {
    id: "rec-systems",
    title: "レコメンデーションシステムを構築する",
    milestoneCount: 12,
    tags: ["機械学習", "データサイエンス", "Python"],
  },
  {
    id: "causal-inference",
    title: "因果推論を学ぶ",
    milestoneCount: 8,
    tags: ["統計学", "データ分析", "研究"],
  },
  {
    id: "llm-engineering",
    title: "LLMエンジニアになる",
    milestoneCount: 15,
    tags: ["AI", "深層学習", "NLP"],
  },
  {
    id: "data-engineering",
    title: "データエンジニアリングの基礎",
    milestoneCount: 10,
    tags: ["データベース", "ETL", "クラウド"],
  },
  {
    id: "computer-vision",
    title: "コンピュータビジョンを理解する",
    milestoneCount: 9,
    tags: ["画像処理", "深層学習", "OpenCV"],
  },
  {
    id: "distributed-systems",
    title: "分散システムの設計",
    milestoneCount: 7,
    tags: ["アーキテクチャ", "スケーラビリティ", "システム設計"],
  },
];

const allTags = [
  "機械学習",
  "データサイエンス",
  "Python",
  "統計学",
  "データ分析",
  "研究",
  "AI",
  "深層学習",
  "NLP",
  "データベース",
  "ETL",
  "クラウド",
  "画像処理",
  "OpenCV",
  "アーキテクチャ",
  "スケーラビリティ",
  "システム設計",
];

export function HomePage({ onGoalClick }: HomePageProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredGoals = selectedTags.length === 0
    ? trendingGoals
    : trendingGoals.filter((goal) =>
        goal.tags.some((tag) => selectedTags.includes(tag))
      );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-b">
        <div className="px-4 py-8 md:py-16 lg:py-20">
          <div className="text-center space-y-4 md:space-y-6">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 tracking-tight px-2 leading-relaxed">
              だれかの道が、<br />きみの道に。
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 px-4">
              学びの地図を、探そう。
            </p>

            {/* Tag Filter */}
            <div className="pt-2 md:pt-4 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-3 md:mb-4 justify-center">
                  <Tag className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
                  <span className="text-sm md:text-base font-medium text-gray-700">
                    タグで探す
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "secondary"}
                      className={`cursor-pointer transition-all text-xs md:text-sm ${
                        selectedTags.includes(tag)
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-white hover:bg-indigo-50 text-gray-700 border border-gray-300"
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                {selectedTags.length > 0 && (
                  <div className="mt-3 md:mt-4 text-center">
                    <button
                      onClick={() => setSelectedTags([])}
                      className="text-xs md:text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
                    >
                      すべてクリア
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Goals */}
      <div className="px-4 py-8 md:px-6 md:py-12 lg:py-16">
        <div className="flex items-center gap-2 mb-4 md:mb-6 lg:mb-8">
          <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
          <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-900">
            {selectedTags.length > 0 ? "フィルタ結果" : "トレンドの学習ゴール"}
          </h2>
          {filteredGoals.length > 0 && (
            <span className="text-sm md:text-base text-gray-500">
              ({filteredGoals.length}件)
            </span>
          )}
        </div>

        {filteredGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {filteredGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                title={goal.title}
                milestoneCount={goal.milestoneCount}
                tags={goal.tags}
                onClick={() => onGoalClick(goal.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-16">
            <p className="text-sm md:text-base text-gray-500">
              選択したタグに一致する学習ゴールが見つかりませんでした。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
