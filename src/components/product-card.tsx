type ProductCardProps = {
  title: string;
  description: string;
  demoLink: string;
};

export default function ProductCard({ title, description, demoLink }: ProductCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <a
        href={demoLink}
        className="inline-block px-6 py-2 rounded-lg font-semibold text-white bg-[#2B4468] hover:bg-[#1f3151] transition"
      >
        View Demo
      </a>
    </div>
  );
}
