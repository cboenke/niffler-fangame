import dynamic from "next/dynamic";

const DynamicGame = dynamic(() => import("../components/game/Game"), {
  ssr: false,
});

export default function GamePage() {
  return <DynamicGame />;
}
