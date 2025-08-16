import { Card, CardContent } from "@/components/ui/card";
type ProductCardProps = {
  title: string;
  description: string;
  demoLink: string;
};

export default function ProductCard({ title, description, icon: Icon, color }: any) {
  return (
    <Card className="shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
      {/* Icon in Circle */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: color }}
      >
        <Icon className="w-10 h-10 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {/* Description */}
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
