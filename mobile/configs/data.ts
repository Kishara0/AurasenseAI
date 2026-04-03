export const slides = [
    {
        id: '1',
        title: 'Hearing strange car noises?',
        subtitle: 'Don\'t worry. Record the sound, and our AI will identify the issue instantly.',
        // Using a placeholder image or component here. 
        // In a real app, you'd require local assets or use URLs.
        image: require("@/assets/onBoarding/slider-1.jpg")
    },
    {
        id: '2',
        title: 'Your pocket mechanic.',
        subtitle: 'We use audio, photos, and questions to provide accurate diagnostics.',
        image: require("@/assets/onBoarding/slider-2.jpg"),
    },
    {
        id: '3',
        title: 'Get instant results.',
        subtitle: 'Save time and money by knowing exactly what is wrong with your vehicle.',
        image: require("@/assets/onBoarding/slider-3.jpg"),
    }
];
export const historyData: HistoryItem[] = [
  {
    id: '1',
    vehicle: 'Toyota Corolla',
    issue: 'Worn Engine Belt. Requires inspection within 500 miles.',
    status: 'moderate',
    date: 'Jan 27, 2026',
    image: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg',
  },
  {
    id: '2',
    vehicle: 'Honda Civic',
    issue: 'Battery Issue. Replaced with new unit.',
    status: 'resolved',
    date: 'Jan 14, 2026',
    image: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg',
  },
  {
    id: '3',
    vehicle: 'Ford F-150',
    issue: 'Oil Change Required. Past due 1,200 miles.',
    status: 'critical',
    date: 'Dec 02, 2025',
    image: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/pickup-49278_1280.jpg',
  },
];


export const diagnosisData: DiagnosisItem[] = [
  {
    id: '1',
    vehicle: 'Toyota Corolla',
    issue: 'Worn Engine Belt. Requires inspection within 500 miles.',
    date: 'Jan 27, 2026',
    image: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg',
  },
  {
    id: '2',
    vehicle: 'Honda Civic',
    issue: 'Battery Issue. Replaced with new unit.',
    date: 'Jan 14, 2026',
    image: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg',
  },
  {
    id: '3',
    vehicle: 'Ford F-150',
    issue: 'Oil Change Required. Past due 1,200 miles.',
    date: 'Dec 02, 2025',
    image: 'https://cdn.pixabay.com/photo/2012/05/29/00/43/pickup-49278_1280.jpg',
  },
];

export const initialMessages:Message[] = [
  {
    id: "t1",
    type: "time",
    text: "Today, 9:41 AM",
  },
  {
    id: "1",
    type: "ai",
    text: "Hello! I've analyzed your engine diagnostics. We found an issue with the engine belt.",
  },
  {
    id: "2",
    type: "user",
    text: "Is it safe to drive for another week?",
    read: "Read 9:42 AM",
  },
  {
    id: "3",
    type: "ai",
    text: "It is risky. If the belt snaps, you will lose power steering and alternator function.",
    extra:
      "I recommend fixing it in 1–2 days to avoid being stranded.",
  },
];


export const StatusConfig = {
  all: {
    label: "All",
    bg: "#000000",
    text: "#ffffff",
  },
  moderate: {
    label: "Moderate",
    bg: "#FEF3C7",
    text: "#B45309",
    icon: "warning",
  },
  resolved: {
    label: "Resolved",
    bg: "#D1FAE5",
    text: "#047857",
    icon: "checkmark-circle",
  },
  critical: {
    label: "Critical",
    bg: "#FEE2E2",
    text: "#B91C1C",
    icon: "alert-circle",
  },
};