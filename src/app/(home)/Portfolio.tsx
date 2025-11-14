'use client';

export default function Portfolio() {
  const sampleData = [
    {
      id: 1,
      title: 'Sample Title 1',
      description: 'Sample Description 1',
      thumbnail: '/assets/image/portfolio/sample1.jpg',
    },
    {
      id: 2,
      title: 'Sample Title 2',
      description: 'Sample Description 2',
      thumbnail: '/assets/image/portfolio/sample2.jpg',
    },
    {
      id: 3,
      title: 'Sample Title 3',
      description: 'Sample Description 3',
      thumbnail: '/assets/image/portfolio/sample3.jpg',
    },
    {
      id: 4,
      title: 'Sample Title 4',
      description: 'Sample Description 4',
      thumbnail: '/assets/image/portfolio/sample4.jpg',
    },
    {
      id: 5,
      title: 'Sample Title 5',
      description: 'Sample Description 5',
      thumbnail: '/assets/image/portfolio/sample5.jpg',
    },
    {
      id: 6,
      title: 'Sample Title 6',
      description: 'Sample Description 6',
      thumbnail: '/assets/image/portfolio/sample6.jpg',
    },
    {
      id: 7,
      title: 'Sample Title 7',
      description: 'Sample Description 7',
      thumbnail: '/assets/image/portfolio/sample7.jpg',
    },
    {
      id: 8,
      title: 'Sample Title 8',
      description: 'Sample Description 8',
      thumbnail: '/assets/image/portfolio/sample8.jpg',
    },
  ];

  return (
    <section className="w-full py-40 px-48 bg-secondary">
      <h2 className="text-[3.2rem] font-bold text-primary mb-12">Portfolio</h2>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-8">
        {sampleData.map((item) => (
          <li key={item.id} className="w-full">
            <div className="w-full h-[40rem] rounded-[1rem] overflow-hidden">
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
