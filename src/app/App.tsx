import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { GoalPage } from "./components/GoalPage";
import { CreateMilestonePage } from "./components/CreateMilestonePage";

type Page = "home" | "goal" | "create";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedGoalId, setSelectedGoalId] = useState<string>("");

  const handleGoalClick = (goalId: string) => {
    setSelectedGoalId(goalId);
    setCurrentPage("goal");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleBack = () => {
    setCurrentPage("home");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      
      {currentPage === "home" && <HomePage onGoalClick={handleGoalClick} />}
      
      {currentPage === "goal" && (
        <GoalPage goalId={selectedGoalId} onBack={handleBack} />
      )}
      
      {currentPage === "create" && <CreateMilestonePage onBack={handleBack} />}
    </div>
  );
}
