import Image from "next/image";

function CompanyPage() {
    const contents = [
        {
            id: 1,
            title: "Mission",
            description:
                "Our mission is to deliver innovative, reliable, and scalable software solutions that empower businesses and transform digital experiences across Rwanda and beyond.",
        },
        {
            id: 2,
            title: "Vision",
            description:
                "Our vision is to become the leading tech company in East Africa, pioneering digital transformation and fostering technological innovation in every sector.",
        },
    ];

    const identities = [
        {
            id: 1,
            image: '/images/profile/profile1.jpg',
            name: "Hirwa Tresor Christian",
            description: 'CEO of Inzozi Labs. Leading the company with passion, ensuring innovative software solutions are delivered efficiently and sustainably.',
            number: '+250 798 342 542',
            email: 'waveb6133@gmail.com',
        },
        {
            id: 2,
            image: '/jodos.jpg',
            name: "Jead DE Dieu",
            description: 'Deputy CEO of Inzozi Labs. Supports operations and development teams to ensure seamless execution of software projects.',
            number: '+250 788 123 456',
            email: 'jead@inzozilabs.com',
        }
    ];

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-5">
            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-10">
                {contents.map((content) => (
                    <div
                        key={content.id}
                        className="flex flex-col p-6 rounded-lg shadow-md bg-[#D4B03A] hover:shadow-lg transition-shadow space-y-4"
                    >
                        <h1 className="text-2xl font-bold text-[#2E4F63]">{content.title}</h1>
                        <p className="text-[#2E4F63] leading-relaxed">{content.description}</p>
                    </div>
                ))}
            </div>

            {/* Leadership Section */}
            <h1 className="text-2xl text-center font-bold text-[#2B4468] underline">Leadership</h1>
            <div className="w-full space-y-16 max-w-5xl mt-5 mb-10">
                {identities.map((i) => (
                    <div key={i.id} className="grid grid-cols-1 md:grid-cols-3 gap-20 p-10 rounded-xl shadow-lg bg-gray-50">
                        <div className="flex items-center justify-center">
                            <Image 
                                src={i.image} 
                                alt={i.name} 
                                width={240}
                                height={240}
                                className="h-60 w-60 rounded-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col space-y-3">
                            <h1 className="text-[#2B4468] text-2xl font-bold">{i.name}</h1>
                            <p className="font-light">{i.description}</p>
                            <p className="font-bold">{i.number}</p>
                            <p className="font-bold">{i.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CompanyPage;