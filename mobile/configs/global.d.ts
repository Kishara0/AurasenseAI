type SlideProps = {
  id: string;
  title: string;
  subtitle: string;
  image: any;
};
type SignUpPros = {
  email: string;
  userName: string;
  password: string;
};
type SignInPros = {
  email: string;
  password: string;
};
type CustomButtonProps = {
  title: string;
  onPress?: () => void;
  isLoading?: boolean;
};
type FilterType = "all" | "moderate" | "critical" | "resolved";
type HistoryItem = {
  id: string;
  vehicle: string;
  issue: string;
  status: "all" | "moderate" | "resolved" | "critical";
  date: string;
  image: string;
};
type HistoryCardProps = {
  item: HistoryItem;
  onPress: () => void;
};
type DiagnosisItem = {
  id: string;
  vehicle: string;
  issue: string;
  date: string;
  image: string;
};

type AddVehicleProps = {
  make: string;
  model: string;
  year: string;
  mileage: string;
};
type ProgressCircleProps = {
  percentage: number;
};
type AnalysisProgressProps = {
  title: string;
  percentage: number;
  icon: string;
};
type TimeMessage = {
  id: string;
  type: "time";
  text: string;
};

type UserMessage = {
  id: string;
  type: "user";
  text: string;
  read?: string;
};

type AIMessage = {
  id: string;
  type: "ai";
  text: string;
  extra?: string;
};

type Message = TimeMessage | UserMessage | AIMessage;

type Provider = "Google" | "Local" | "Apple";

type User= {
  id: string;
  userName: string;
  email: string;
  password?: string | null;
  avatar?: string | null;
  provider: Provider;
  cars?: Cars[];
  createdAt: Date;
  updatedAt: Date;
}

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  updateAvatar: (avatar: string) => void;
  clearUser: () => void;
};


type CarsProps = {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  createdAt: string;
  updatedAt: string;
};

type DiagnosisCardProps = {
  item: CarsProps;
  onPress: () => void;
};