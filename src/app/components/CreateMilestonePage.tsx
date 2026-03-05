import { useState } from "react";
import { ArrowLeft, GripVertical, Plus, Trash2 } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";
import { ResourceCard } from "./ResourceCard";

type CreateMilestonePageProps = {
  onBack: () => void;
};

type Resource = {
  id: string;
  type: "book" | "paper" | "article" | "website" | "github" | "video";
  title: string;
  url: string;
  description: string;
};

const ITEM_TYPE = "RESOURCE";

type DraggableResourceProps = {
  resource: Resource;
  index: number;
  moveResource: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (id: string) => void;
};

function DraggableResource({ resource, index, moveResource, onDelete }: DraggableResourceProps) {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveResource(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`transition-opacity ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <div className="group relative">
        <div className="absolute left-0 top-0 bottom-0 w-6 md:w-8 flex items-start justify-center pt-4 md:pt-6 cursor-move touch-none">
          <GripVertical className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 group-hover:text-gray-600" />
        </div>
        <div className="pl-6 md:pl-8">
          <div className="relative">
            <ResourceCard
              type={resource.type}
              title={resource.title}
              description={resource.description}
              url={resource.url}
              showConnector={false}
            />
            <button
              onClick={() => onDelete(resource.id)}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-1 md:p-1.5 rounded-lg bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors md:opacity-0 md:group-hover:opacity-100 shadow-sm"
            >
              <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CreateMilestonePage({ onBack }: CreateMilestonePageProps) {
  const [goal, setGoal] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [newResource, setNewResource] = useState({
    type: "book" as Resource["type"],
    title: "",
    url: "",
    description: "",
  });

  const moveResource = (dragIndex: number, hoverIndex: number) => {
    const updatedResources = [...resources];
    const [removed] = updatedResources.splice(dragIndex, 1);
    updatedResources.splice(hoverIndex, 0, removed);
    setResources(updatedResources);
  };

  const addResource = () => {
    if (newResource.title) {
      setResources([
        ...resources,
        {
          ...newResource,
          id: Date.now().toString(),
        },
      ]);
      setNewResource({
        type: "book",
        title: "",
        url: "",
        description: "",
      });
    }
  };

  const deleteResource = (id: string) => {
    setResources(resources.filter((r) => r.id !== id));
  };

  const handleSubmit = () => {
    console.log("Milestone created:", { goal, title, description, resources });
    onBack();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <div className="px-4 py-4 md:px-6 md:py-6 lg:py-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 md:mb-6 -ml-2 md:-ml-3 text-gray-600 hover:text-gray-900 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 md:mr-2" />
            戻る
          </Button>

          <h1 className="text-xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-1.5 md:mb-2 leading-tight">
            きみの道を、のこそう。
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8">
            だれかの、あしたのために。
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Form */}
            <div className="space-y-4 md:space-y-6">
              <Card className="p-4 md:p-5 lg:p-6 bg-white">
                <h2 className="text-base md:text-lg lg:text-xl font-medium text-gray-900 mb-3 md:mb-4">基本情報</h2>
                
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <Label htmlFor="goal" className="text-sm">学習ゴール</Label>
                    <Select value={goal} onValueChange={setGoal}>
                      <SelectTrigger id="goal" className="mt-1.5 text-sm">
                        <SelectValue placeholder="ゴールを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rec-systems" className="text-sm">
                          レコメンデーションシステムを構築する
                        </SelectItem>
                        <SelectItem value="causal-inference" className="text-sm">
                          因果推論を学ぶ
                        </SelectItem>
                        <SelectItem value="llm-engineering" className="text-sm">
                          LLMエンジニアになる
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="title" className="text-sm">マイルストーンのタイトル</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="例: 実践的なレコメンドエンジニアパス"
                      className="mt-1.5 text-sm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm">説明</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="このマイルストーンの概要を説明してください"
                      rows={3}
                      className="mt-1.5 text-sm"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-5 lg:p-6 bg-white">
                <h2 className="text-base md:text-lg lg:text-xl font-medium text-gray-900 mb-3 md:mb-4">
                  リソースを追加
                </h2>

                <div className="space-y-3 md:space-y-4">
                  <div>
                    <Label htmlFor="resource-type" className="text-sm">リソースの種類</Label>
                    <Select
                      value={newResource.type}
                      onValueChange={(value) =>
                        setNewResource({ ...newResource, type: value as Resource["type"] })
                      }
                    >
                      <SelectTrigger id="resource-type" className="mt-1.5 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="book" className="text-sm">書籍</SelectItem>
                        <SelectItem value="paper" className="text-sm">論文</SelectItem>
                        <SelectItem value="article" className="text-sm">記事</SelectItem>
                        <SelectItem value="website" className="text-sm">ウェブサイト</SelectItem>
                        <SelectItem value="github" className="text-sm">GitHub</SelectItem>
                        <SelectItem value="video" className="text-sm">動画</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="resource-title" className="text-sm">タイトル</Label>
                    <Input
                      id="resource-title"
                      value={newResource.title}
                      onChange={(e) =>
                        setNewResource({ ...newResource, title: e.target.value })
                      }
                      placeholder="リソースのタイトル"
                      className="mt-1.5 text-sm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="resource-url" className="text-sm">URL</Label>
                    <Input
                      id="resource-url"
                      value={newResource.url}
                      onChange={(e) =>
                        setNewResource({ ...newResource, url: e.target.value })
                      }
                      placeholder="https://..."
                      className="mt-1.5 text-sm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="resource-description" className="text-sm">説明</Label>
                    <Textarea
                      id="resource-description"
                      value={newResource.description}
                      onChange={(e) =>
                        setNewResource({ ...newResource, description: e.target.value })
                      }
                      placeholder="リソースの簡単な説明"
                      rows={2}
                      className="mt-1.5 text-sm"
                    />
                  </div>

                  <Button
                    onClick={addResource}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    リソースを追加
                  </Button>
                </div>
              </Card>

              <Button
                onClick={handleSubmit}
                disabled={!goal || !title || resources.length === 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm md:text-base py-3 md:py-6"
              >
                マイルストーンを公開
              </Button>
            </div>

            {/* Preview */}
            <div className="order-first lg:order-last">
              <Card className="p-4 md:p-5 lg:p-6 bg-white lg:sticky lg:top-20">
                <h2 className="text-base md:text-lg lg:text-xl font-medium text-gray-900 mb-3 md:mb-4">プレビュー</h2>

                {title && (
                  <h3 className="text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">{title}</h3>
                )}

                {resources.length > 0 ? (
                  <div className="ml-0 md:ml-1 lg:ml-2">
                    {resources.map((resource, index) => (
                      <DraggableResource
                        key={resource.id}
                        resource={resource}
                        index={index}
                        moveResource={moveResource}
                        onDelete={deleteResource}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-12 text-sm md:text-base text-gray-500">
                    リソースを追加すると、<br className="sm:hidden" />ここにプレビューが表示されます
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
