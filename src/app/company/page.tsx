import { Avatar, AvatarImage } from "@/components/ui/avatar";

function CompanyPage() {


    const contents = [
        {
            id: 1,
            title: "Mission",
            description:
                "Instructions issued to a computer system (such as a text-to-image artificial intelligence) in the form of written or spoken language.",
        },
        {
            id: 2,
            title: "Vision",
            description:
                "Instructions issued to a computer system (such as a text-to-image artificial intelligence) in the form of written or spoken language.",
        },
    ];

    const identities = [
        {
            id: 1,
            image: '/images/profile/profile1.jpg',
            name: "Hirwa Tresor",
            description: 'CEO Umuyobozi mukuru wikigo Inzozi Labs gikora Ibyereke ama softwares kandi uzakomeza gukora mpaka abaye uwa danger',
            number: '+250 798 342 542',
            email: 'waveb6133@gmail.com',
        },
        {
            id: 2,
            image: '/images/profile/profile2.jpg',
            name: "Jead DE Dieu",
            description: 'Y\'ungirije umuyobozi mukuru wikigo Inzozi Labs gikora Ibyereke ama softwares kandi uzakomeza gukora mpaka abaye uwa danger',
            number: '+250 798 342 542',
            email: 'waveb6133@gmail.com',
        }
    ]
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-5">
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
            <h1 className="text-2xl text-center font-bold text-[#2B4468] underline">Leardship</h1>
            <div className="w-full space-y-16 max-w-5xl mt-5 mb-10">
                    {
                        identities.map((i) => 
                            <div key={i.id} className="grid grid-cols-1 md:grid-cols-3 gap-20 p-10 rounded-xl shadow-lg bg-gray-50">
                                <div className="flex items-center justify-center">
                                    <img src={i.image} alt={i.name} className="h-60 w-60 rounded-full"/>
                                </div>
                                <div className="flex flex-col space-y-3">
                                    <h1 className="text-[#2B4468] text-2xl font-bold">{i.name}</h1>
                                    <p className="font-light">{i.description}</p>
                                    <p className="font-bold">{i.number}</p>
                                    <p className="font-bold">{i.email}</p>
                                </div>
                            </div>
                        )
                    }
            </div>
        </div>
    );
}

export default CompanyPage;
