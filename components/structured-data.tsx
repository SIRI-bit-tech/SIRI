export function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Emuesiri Onovwiona',
    url: 'https://siritech.com',
    image: 'https://siritech.com/avatar.jpg',
    description:
      'Full-stack software engineer shipping production-ready systems',
    jobTitle: 'Full-Stack Engineer',
    sameAs: [
      'https://twitter.com/siritech',
      'https://linkedin.com/in/emuesiri',
      'https://github.com/siritech',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'emuesiri@siritech.com',
      contactType: 'Professional',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'SIRITECH',
      url: 'https://siritech.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SIRITECH',
    url: 'https://siritech.com',
    logo: 'https://siritech.com/logo.png',
    description:
      'Full-stack engineer shipping production-ready systems. 3+ years building fast, scalable web applications.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'emuesiri@siritech.com',
      contactType: 'Professional',
    },
    sameAs: [
      'https://twitter.com/siritech',
      'https://linkedin.com/in/emuesiri',
      'https://github.com/siritech',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
