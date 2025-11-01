import { Card, CardContent } from "@/components/ui/card";

type ProductCardProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

export default function ProductCard({ 
  title, 
  description, 
  icon: Icon, 
  color 
}: ProductCardProps) {
  return (
    <Card className="shadow-lg dark:shadow-gray-900/50 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl dark:hover:shadow-gray-800/70 transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:scale-105">
      {/* Icon in Circle */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: color }}
      >
        <Icon className="w-10 h-10 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>

      {/* Description */}
      <CardContent className="p-0">
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}