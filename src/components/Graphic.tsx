import { Card } from "./ui/Card";

interface GraphicProps {
  infoPoint: boolean;
}

export function Graphic({ infoPoint }: GraphicProps) {
  return <Card disabled={infoPoint}>graph</Card>;
}
