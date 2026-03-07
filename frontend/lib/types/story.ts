export interface AcceptanceCriteria {
  id: string;
  description: string;
  met: boolean;
}

export interface BacklogItem {
  id: string;
  type: "epic" | "story";
  title: string;
  description: string;
}

export interface RefinedStory {
  id: string;
  title: string;
  description: string;
  acceptance_criteria: AcceptanceCriteria[];
  business_value_score: number;
  dependencies: string[];
  original_epic_id: string | null;
}

export interface EstimatedStory extends RefinedStory {
  story_points: number;
  confidence_range: {
    low: number;
    high: number;
    confidence_pct: number;
  };
  comparable_stories: ComparableStory[];
  estimation_rationale: string;
}

export interface ComparableStory {
  id: string;
  title: string;
  story_points: number;
  similarity_score: number;
}

export type FeedbackAction = "accept" | "modify" | "reject";

export interface StoryFeedback {
  story_id: string;
  action: FeedbackAction;
  comment?: string;
}
