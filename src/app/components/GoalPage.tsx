import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MilestoneCard } from "./MilestoneCard";

type GoalPageProps = {
  goalId: string;
  onBack: () => void;
};

const goalData: Record<string, { title: string; description: string }> = {
  "rec-systems": {
    title: "レコメンデーションシステムを構築する",
    description: "エンジニアやデータサイエンティストが共有する学習リソースとパス",
  },
  "causal-inference": {
    title: "因果推論を学ぶ",
    description: "統計学と因果関係の理解を深めるための体系的な学習パス",
  },
  "llm-engineering": {
    title: "LLMエンジニアになる",
    description: "大規模言語モデルの開発と応用を学ぶための実践的なリソース",
  },
};

const milestones = [
  {
    id: "1",
    title: "実践的なレコメンドエンジニアパス",
    author: "田中太郎",
    estimatedTime: "3ヶ月",
    resources: [
      {
        id: "r1",
        type: "book" as const,
        title: "Pattern Recognition and Machine Learning",
        description: "機械学習の基礎理論を網羅的に学ぶ教科書",
        url: "https://example.com",
      },
      {
        id: "r2",
        type: "paper" as const,
        title: "Matrix Factorization Techniques for Recommender Systems",
        description: "協調フィルタリングの代表的な手法を解説した論文",
        url: "https://example.com",
      },
      {
        id: "r3",
        type: "website" as const,
        title: "RecSys Tutorial - 推薦システム入門",
        description: "実装例とともに学ぶチュートリアル",
        url: "https://example.com",
      },
      {
        id: "r4",
        type: "github" as const,
        title: "LightFM - Hybrid Recommendation Algorithm",
        description: "コンテンツベースと協調フィルタリングを組み合わせたライブラリ",
        url: "https://github.com/lyst/lightfm",
      },
    ],
  },
  {
    id: "2",
    title: "深層学習によるレコメンデーション",
    author: "佐藤花子",
    estimatedTime: "2ヶ月",
    resources: [
      {
        id: "r5",
        type: "paper" as const,
        title: "Neural Collaborative Filtering",
        description: "ニューラルネットワークを用いた協調フィルタリング",
        url: "https://example.com",
      },
      {
        id: "r6",
        type: "video" as const,
        title: "Deep Learning for Recommender Systems",
        description: "スタンフォード大学の講義動画",
        url: "https://example.com",
      },
      {
        id: "r7",
        type: "github" as const,
        title: "RecBole - 統合推薦システムライブラリ",
        description: "PyTorchベースの包括的な推薦システムフレームワーク",
        url: "https://github.com/RUCAIBox/RecBole",
      },
    ],
  },
  {
    id: "3",
    title: "プロダクション環境での実装",
    author: "鈴木一郎",
    estimatedTime: "1ヶ月",
    resources: [
      {
        id: "r8",
        type: "article" as const,
        title: "Building Scalable Recommendation Systems",
        description: "大規模システムの設計と実装のベストプラクティス",
        url: "https://example.com",
      },
      {
        id: "r9",
        type: "github" as const,
        title: "TensorFlow Recommenders",
        description: "TensorFlowエコシステムの推薦システムライブラリ",
        url: "https://github.com/tensorflow/recommenders",
      },
    ],
  },
];

export function GoalPage({ goalId, onBack }: GoalPageProps) {
  const goal = goalData[goalId] || goalData["rec-systems"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-4 md:px-6 md:py-6 lg:py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 md:mb-6 -ml-2 md:-ml-3 text-gray-600 hover:text-gray-900 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 md:mr-2" />
          戻る
        </Button>

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-2 md:mb-3 leading-tight">{goal.title}</h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">{goal.description}</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="top" className="w-full">
          <TabsList className="mb-4 md:mb-6 bg-white border w-full justify-start">
            <TabsTrigger value="top" className="text-xs md:text-sm">トップマイルストーン</TabsTrigger>
            <TabsTrigger value="newest" className="text-xs md:text-sm">新着</TabsTrigger>
            <TabsTrigger value="popular" className="text-xs md:text-sm">人気</TabsTrigger>
          </TabsList>

          <TabsContent value="top" className="space-y-4 md:space-y-5 lg:space-y-6">
            {milestones.map((milestone) => (
              <MilestoneCard
                key={milestone.id}
                title={milestone.title}
                author={milestone.author}
                estimatedTime={milestone.estimatedTime}
                resources={milestone.resources}
              />
            ))}
          </TabsContent>

          <TabsContent value="newest" className="space-y-4 md:space-y-5 lg:space-y-6">
            {milestones.slice().reverse().map((milestone) => (
              <MilestoneCard
                key={milestone.id}
                title={milestone.title}
                author={milestone.author}
                estimatedTime={milestone.estimatedTime}
                resources={milestone.resources}
              />
            ))}
          </TabsContent>

          <TabsContent value="popular" className="space-y-4 md:space-y-5 lg:space-y-6">
            {milestones.map((milestone) => (
              <MilestoneCard
                key={milestone.id}
                title={milestone.title}
                author={milestone.author}
                estimatedTime={milestone.estimatedTime}
                resources={milestone.resources}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
