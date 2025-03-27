const env = {
    SERVER_URL: 'https://simons-backend.onrender.com/e-learning-portal/api/core/v01',

    // 'https://simons-backend.onrender.com/e-learning-portal/api/core/v01'
    // 'http://localhost:5001/e-learning-portal/api/core/v01'

    QS_MAIN: [
        {
          title: 'Question 1',
          question: 'I know that different search engines may give different search results, because they are influenced by commercial factors.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 1.1,
          type: 'Knowledge',
          level: 'Intermediate',
        },
        {
          title: 'Question 2',
          question: 'I know which words to use in order to find what I need quickly (e.g. to search online or within a document).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 1.1,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 3',
          question: 'When I use a search engine, I can take advantage of its advanced features.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 1.1,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 4',
          question: 'I know how to find a website I have visited before.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 1.1,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 5',
          question: 'I know how to differentiate promoted content from other content I find or receive online (e.g., recognizing an advert on social media or search engines).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 1.2,
          type: 'Knowledge',
          level: 'Intermediate',
        },
        {
          title: 'Question 6',
          question: 'I know how to identify the purpose of an online information source (e.g., to inform, influence, entertain, or sell).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 1.2,
          type: 'Knowledge',
          level: 'Intermediate',
        },
        {
          title: 'Question 7',
          question: 'I critically check if the information I find online is reliable.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 1.2,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 8',
          question: 'I know that some information on the Internet is false (e.g., fake news).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 1.2,
          type: 'Knowledge',
          level: 'Foundation',
        },
        {
          title: 'Question 9',
          question: 'I know about different storage media (e.g., internal or external hard disk, USB memory, pen drive, memory card).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 1.3,
          type: 'Knowledge',
          level: 'Intermediate',
        },
        {
          title: 'Question 10',
          question: 'I know how to organize digital content (e.g., documents, images, videos) using folders or tagging to find them back later.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 1.3,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 11',
          question: 'I know how to copy and move files (e.g., documents, images, videos) between folders, devices, or on the cloud.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 1.3,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 12',
          question: 'I know how to manage and analyse data using software (e.g. sorting, filtering, calculations)',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 1.3,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 13',
          question: 'I know how to send, reply and forward e-mails.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.1,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 14',
          question: 'I know that many communication services and social media are free of charge because they are paid for by advertising',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.1,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 15',
          question: 'I know how to use advanced videoconferencing features (e.g. moderating, recording audio and video)',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.1,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 16',
          question: 'I know which communication tools and services (e.g. phone, email, video conference, text message) are appropriate to use in different circumstances.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.1,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 17',
          question: 'I am open towards sharing digital content that I think might be interesting and useful to others',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.2,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 18',
          question: 'I know how to use cloud services (e.g. Google Drive, DropBox and OneDrive) to share my files',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.2,
          type: 'Attitude',
          level: 'Intermediate',
        },
        {
          title: 'Question 19',
          question: 'I know how to change who I share content with (e.g. friends, friends of friends, everyone).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.2,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 20',
          question: 'I know how to reference the source of documents (e.g. the author or web address) that I found online.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.2,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 21',
          question: 'I know how to apply for a job using a digital platform (e.g. fill in a form, upload my CV and photo).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.3,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 22',
          question: 'I know that many public services are available on the Internet (e.g. booking a health visit, submitting tax declaration, requesting birth, marriage, residence and other certificates).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.3,
          type: 'Knowledge',
          level: 'Intermediate',
        },
        {
          title: 'Question 23',
          question: 'I know how to pay for goods and services that I buy online (e.g. using direct bank transfer, credit/debit cards, other online paymentsystems). ',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.3,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 24',
          question: 'It matters to me to debate social or political issues online (e.g. in online forums, news sites, Facebook, Twitter).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.3,
          type: 'Attitude',
          level: 'Intermediate',
        },
        {
          title: 'Question 25',
          question: 'I understand the benefits of remote collaboration (e.g. reduced commuting time). ',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.4,
          type: 'Knowledge',
          level: 'Intermediate',
        },
        {
          title: 'Question 26',
          question: 'I know how to edit a shared, online document.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.4,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 27',
          question: 'I know how to invite others and give appropriate permissions to collaborate on a shared document. ',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.4,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 28',
          question: 'I am aware that I should ask permission from a person before publishing or sharing photos about them.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.5,
          type: 'Knowledge',
          level: 'Foundation',
        },
        {
          title: 'Question 29',
          question: 'I know how to recognise online messages and behaviours that attack certain groups or individuals (e.g. hate speech).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.5,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 30',
          question: 'I can take the right measures if someone is doing the wrong thing online (e.g. an offensive comment, threats).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.5,
          type: 'Attitude',
          level: 'Intermediate',
        },
        {
          title: 'Question 31',
          question: 'I know how to behave online according to the situation (e.g. formal vs informal).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.5,
          type: 'Attitude',
          level: 'Foundation',
        },
        {
          title: 'Question 32',
          question: 'I know my digital identity is everything that identifies me in online environments (e.g. usernames, likes and posts on social media, petitions signed online).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.6,
          type: 'Knowledge',
          level: 'Intermediate',
        },
        {
          title: 'Question 33',
          question: 'I know how to create a profile in digital environments for personal or professional purposes.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.6,
          type: 'Knowledge',
          level: 'Intermediate',
        },
        {
          title: 'Question 34',
          question: 'I know that the EU introduced regulation on The Right to Be Forgotten (i.e. to have one s private information removed from the Internet).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.6,
          type: 'Knowledge',
          level: 'Intermediate',
        },
        {
          title: 'Question 35',
          question: 'I know how to configure the settings in my Internet browser to prevent or limit cookies.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 2.6,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 36',
          question: 'I know how to create and edit digital text files (e.g. Word, OpenDocument, Google Docs).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.1,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 37',
          question: 'I know how to express myself by creating digital content on the Internet (e.g. blog post, video on YouTube)',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.1,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 38',
          question: 'I know how to produce a multimedia presentation with text, images, audio and video elements.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.1,
          type: 'Knowledge',
          level: 'Advanced',
        },
        {
          title: 'Question 39',
          question: 'To express myself, I am careful to choose the right type of digital media depending on the audience and my aim (e.g. using social media to promote a project).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.1,
          type: 'Attitude',
          level: 'Intermediate',
        },
        {
          title: 'Question 40',
          question: 'I am keen to create new digital content by mixing and modifying existing digital resources (e.g. a presentation with photos and a soundtrack found on the Internet)',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.2,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 41',
          question: 'I know that some digital content can be reused and reworked legally (e.g. public domain or with Creative Commons licences).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.2,
          type: 'Knowledge',
          level: 'Advanced',
        },
        {
          title: 'Question 42',
          question: 'I know how to edit or make changes to digital content that others have created (e.g. insert a text into an image, edit a wiki).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.2,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 43',
          question: 'I know how to create something new by mixing different types of content (e.g. text and images).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.2,
          type: 'Attitude',
          level: 'Foundation',
        },
        {
          title: 'Question 44',
          question: 'I am careful to follow the rules about copyrights and licenses of digital content that I find',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.3,
          type: 'Attitude',
          level: 'Intermediate',
        },
        {
          title: 'Question 45',
          question: 'I know that downloading or sharing digital content (e.g. music, software, films) may have ethical or legal consequences.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.3,
          type: 'Attitude',
          level: 'Intermediate',
        },
        {
          title: 'Question 46',
          question: 'I can detect when digital content is made available illegally (e.g. software, movies, music, books, TV)',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.3,
          type: 'Knowledge',
          level: 'Intermediate',
        },
        {
          title: 'Question 47',
          question: 'I know which different types of licences apply to the use of digital content (e.g. Creative Commons licences).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.3,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 48',
          question: 'I am interested in understanding how a task can be broken down into steps so that it can be automated, for example in software or by a robot',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.4,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 49',
          question: 'I know that programming languages (e.g. Python, Visual Basic, Java) are used to provide a digital device instructions to carry out a task',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.4,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 50',
          question: 'I can write scripts, macros and simple applications to automate the execution of a task.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.4,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 51',
          question: 'I know that there could be different algorithmic solutions to accomplish a specific computational task (e.g. sorting and searching).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 3.4,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 52',
          question: 'I understand the benefits and also the safety risks when using Internet-connected devices or systems (e.g. smart watches, smart home devices).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.1,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 53',
          question: 'I know about the importance of keeping the operating system, antivirus and other software up-to-date in order to prevent security issues',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.1,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 54',
          question: 'I know how to configure the settings of a firewall on different devices.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.1,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 55',
          question: 'I know how to recover digital information and other content (e.g. photos, contacts) from a backup',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.1,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 56',
          question: 'I know how to restrict or refuse access to my geographical location.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.2,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 57',
          question: 'I know how to identify suspicious e-mail messages that try to obtain my personal data.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.2,
          type: 'Knowledge',
          level: 'Intermediate',
        },
        {
          title: 'Question 58',
          question: 'I know how to check that the website where I am asked to provide personal data is secure (e.g. https sites, safety logo or certificate).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.2,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 59',
          question: 'I know which personal data I should not share and display online (e.g. on social media). ',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.2,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 60',
          question: 'I am careful about checking the privacy policies of the digital services that I use',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.2,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 61',
          question: '4.3.1 I am aware that I should manage the time I spend on my digital devices',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.3,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 62',
          question: '4.3.3 I know how to protect myself from unwanted and malicious online encounters and materials (e.g. spam messages, identity theft emails).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.3,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 63',
          question: 'I know about digital tools that can help older people or people with special needs.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.3,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 64',
          question: 'I seek out ways in which digital technologies could help me to live and consume in a more environmentally friendly way.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.4,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 65',
          question: 'I know that old digital devices and consumables (e.g. computers, smartphones, batteries) must be appropriately disposed to minimise their environmental impact.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.4,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 66',
          question: 'I know how to reduce the energy consumption of my devices (e.g. change settings, close apps, turn off wifi).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.4,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 67',
          question: 'I know "green" behaviours to follow when buying or using digital devices (e.g. purchase devices with Eco-label, restrain from unnecessary printing of digital files, do not leave mobile phones and laptop chargers connected without the device).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 4.4,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 68',
          question: 'When I face a technical problem, I try step-by-step to identify the problem',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.1,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 69',
          question: 'I know some reasons why a digital device may fail to connect online (e.g. wrong wifi password, airplane mode on). ',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.1,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 70',
          question: 'When I face a technical problem, I am able to find solutions on the Internet. ',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.1,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 71',
          question: 'I am able to edit the configurations of the operating system of my digital devices to solve technical problems (e.g. automatic stop/start of services, modify registry keys)',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.1,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 72',
          question: 'I usually try to find out if there is a technology solution that might help me address a personal or professional need.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.2,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 73',
          question: 'I know the main functions of the most common digital devices (computer, tablet, smartphone).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.2,
          type: 'Skills',
          level: 'Foundation',
        },
        {
          title: 'Question 74',
          question: 'I know how to select the right tool, device or service to perform a given task (e.g. select a smartphone for my needs, choose a tool for a professional videocall).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.2,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 75',
          question: 'I know technical solutions that can improve the access and use of digital tools such as language translation, magnification or zoom and text-to-voice functionality.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.2,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 76',
          question: 'I know that digital technology can be used as a powerful tool to innovate processes and products',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.3,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 77',
          question: 'I am willing to take part in challenges and contests, aimed at solving intellectual, social or practical problems through digital technologies.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.3,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 78',
          question: 'I can use data tools (e.g. databases, data mining and analysis software) that manage and organize complex information to make decisions and solve problems.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.3,
          type: 'Skills',
          level: 'Advanced',
        },
        {
          title: 'Question 79',
          question: 'I am willing to help people in my community improve their digital skills.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.4,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 80',
          question: 'I am curious about new digital devices and applications and I am keen to experiment with them whenever I find the opportunity.',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.4,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 81',
          question: 'I know how to use online learning tools to improve my digital skills (e.g. video tutorial, online courses).',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.4,
          type: 'Skills',
          level: 'Intermediate',
        },
        {
          title: 'Question 82',
          question: 'I know about new trends in the digital world and how they impact on my personal or professional life',
          options: ['I don t know', 'I need some help', 'I can do it by my own', 'I can help others'],
          answer: '',
          points: 5.4,
          type: 'Skills',
          level: 'Intermediate',
        },
      ],
      QS_CAT: [
        { id:0, category: '1.1', title: 'Browsing, searching and filtering data, information and digital content', mainCategory: 'Information & Data Literacy' },
        { id:1, category: '1.2', title: 'Evaluating data, information and digital content', mainCategory: 'Information & Data Literacy' },
        { id:2, category: '1.3', title: 'Managing data, information and digital content', mainCategory: 'Information & Data Literacy' },
        { id:3, category: '2.1', title: 'Interacting through digital technologies', mainCategory: 'Com. & Collaboration' },
        { id:4, category: '2.2', title: 'Sharing information and content through digital technologies', mainCategory: 'Com. & Collaboration' },
        { id:5, category: '2.3', title: 'Engaging in citizenship through digital technologies', mainCategory: 'Com. & Collaboration' },
        { id:6, category: '2.4', title: 'Collaborating through digital technologies', mainCategory: 'Com. & Collaboration' },
        { id:7, category: '2.5', title: 'Netiquette', mainCategory: 'Com. & Collaboration' },
        { id:8, category: '2.6', title: 'Managing digital identity', mainCategory: 'Com. & Collaboration' },
        { id:9, category: '3.1', title: 'Developing digital content', mainCategory: 'Digital Content Creation' },
        { id:10, category: '3.2', title: 'Integrating and re-elaborating digital content', mainCategory: 'Digital Content Creation' },
        { id:11, category: '3.3', title: 'Copyright and licenses', mainCategory: 'Digital Content Creation' },
        { id:12, category: '3.4', title: 'Programming', mainCategory: 'Digital Content Creation' },
        { id:13, category: '4.1', title: 'Protecting devices', mainCategory: 'Safety' },
        { id:14, category: '4.2', title: 'Protecting personal data and privacy', mainCategory: 'Safety' },
        { id:15, category: '4.3', title: 'Protecting health and well-being', mainCategory: 'Safety' },
        { id:16, category: '4.4', title: 'Protecting the environment', mainCategory: 'Safety' },
        { id:17, category: '5.1', title: 'Solving technical problems', mainCategory: 'Problem Solving' },
        { id:18, category: '5.2', title: 'Identifying needs and technological responses', mainCategory: 'Problem Solving' },
        { id:19, category: '5.3', title: 'Creatively using digital technologies', mainCategory: 'Problem Solving' },
        { id:20, category: '5.4', title: 'Identifying digital competence gaps', mainCategory: 'Problem Solving' },
      ],
      
      QS_SAMPLE : [
        {
          title: 'Question 1',
          question: 'What color are bananas?',
          options: ['Blue', 'Green', 'Yellow', 'Purple'],
          answer: 'Yellow',
          points: 1.0,
          type: 'Knowledge',
          level: 'Foundation',
        },
        {
          title: 'Question 2',
          question: 'Which animal says “meow”?',
          options: ['Dog', 'Cat', 'Cow', 'Sheep'],
          answer: 'Cat',
          points: 1.0,
          type: 'Knowledge',
          level: 'Foundation',
        },
        {
          title: 'Question 3',
          question: 'What is 2 + 2?',
          options: ['3', '4', '5', '6'],
          answer: '4',
          points: 1.0,
          type: 'Knowledge',
          level: 'Foundation',
        },
        {
          title: 'Question 4',
          question: 'Where do fish live?',
          options: ['In the sky', 'In the forest', 'In the water', 'In a desert'],
          answer: 'In the water',
          points: 1.0,
          type: 'Knowledge',
          level: 'Foundation',
        },
        {
          title: 'Question 5',
          question: 'Which fruit is red and often found in pies?',
          options: ['Banana', 'Apple', 'Orange', 'Grape'],
          answer: 'Apple',
          points: 1.0,
          type: 'Knowledge',
          level: 'Foundation',
        },
        {
          title: 'Question 6',
          question: 'What do bees make that is sweet and sticky?',
          options: ['Jam', 'Chocolate', 'Honey', 'Butter'],
          answer: 'Honey',
          points: 1.0,
          type: 'Knowledge',
          level: 'Foundation',
        }
      ],

      QS_SAMPLE2: [
        {
            title: "Question 1",
            question: "When articulating an information need, what should be your first step?",
            options: [
                "Identify possible sources",
                "Define the type and scope of information required",
                "Choose a search engine",
                "Look for images"
            ],
            answer: "Define the type and scope of information required",
            points: 1.0,
            type: "1.1",
            level: "basic"
        },
        {
            title: "Question 2",
            question: "If you are unsure of what information you need, which is the best approach?",
            options: [
                "Search for everything",
                "Narrow down the focus through brainstorming key topics",
                "Use only one search engine",
                "Rely on the first result"
            ],
            answer: "Narrow down the focus through brainstorming key topics",
            points: 1.0,
            type: "1.1",
            level: "basic"
        },
        {
            title: "Question 3",
            question: "What is the main benefit of using Boolean operators in search queries?",
            options: [
                "They provide more aesthetically pleasing results",
                "They help refine or broaden search results",
                "They speed up search engine performance",
                "They are only useful for experts"
            ],
            answer: "They help refine or broaden search results",
            points: 1.0,
            type: "1.1",
            level: "basic"
        },
        {
          title: "Question 4",
          question: "How can you refine your search results when too many unrelated items appear?",
          options: [
              "Add more specific keywords",
              "Use only general terms",
              "Search in a different language",
              "Ignore the first few results"
          ],
          answer: "Add more specific keywords",
          points: 1.0,
          type: "1.1",
          level: "basic"
      },
      {
          title: "Question 5",
          question: "What is a hyperlink typically used for in digital environments?",
          options: [
              "Displaying images",
              "Redirecting to another webpage or source",
              "Saving information for later use",
              "Preventing access to content"
          ],
          answer: "Redirecting to another webpage or source",
          points: 1.0,
          type: "1.1",
          level: "basic"
      },
      {
          title: "Question 6",
          question: "What should be a key consideration when updating a search strategy?",
          options: [
              "The layout of the search engine page",
              "The number of sources available",
              "The refinement of search terms based on new findings",
              "The inclusion of unrelated topics for broader results"
          ],
          answer: "The refinement of search terms based on new findings",
          points: 1.0,
          type: "1.1",
          level: "basic"
      },
      {
          title: "Question 7",
          question: "Which of the following is NOT an information need?",
          options: [
              "Finding out the cause of a historical event",
              "Choosing a source based on personal bias",
              "Looking for data on a scientific topic",
              "Understanding the purpose of a search"
          ],
          answer: "Choosing a source based on personal bias",
          points: 1.0,
          type: "1.1",
          level: "master"
      },
      {
          title: "Question 8",
          question: "If you want to exclude a term from your search, which Boolean operator should you use?",
          options: [
              "AND",
              "OR",
              "NOT",
              "WITH"
          ],
          answer: "NOT",
          points: 1.0,
          type: "1.1",
          level: "master"
      },
      {
          title: "Question 9",
          question: "If you encounter a paywall when trying to access an article, what should you do?",
          options: [
              "Abandon the search",
              "Look for free access through institutional logins or alternative databases",
              "Ignore the article entirely",
              "Skip to the next result"
          ],
          answer: "Look for free access through institutional logins or alternative databases",
          points: 1.0,
          type: "1.1",
          level: "master"
      },
      {
          title: "Question 10",
          question: "How do menus and navigation bars assist in digital content browsing?",
          options: [
              "They hide irrelevant content",
              "They organize content categories for easy access",
              "They slow down page loading times",
              "They automatically filter out advertisements"
          ],
          answer: "They organize content categories for easy access",
          points: 1.0,
          type: "1.1",
          level: "master"
      },
      {
          title: "Question 11",
          question: "What’s an effective way to adapt your search strategy over time?",
          options: [
              "Use trial and error with search results",
              "Rely on one source to provide all necessary information",
              "Evaluate the quality of results and adjust search terms accordingly",
              "Avoid updating search strategies once you begin"
          ],
          answer: "Evaluate the quality of results and adjust search terms accordingly",
          points: 1.0,
          type: "1.1",
          level: "master"
      },
      {
          title: "Question 12",
          question: "Why is it important to update search strategies regularly?",
          options: [
              "To avoid repetition of results",
              "To stay informed about newly available data and sources",
              "To prevent distractions during browsing",
              "To reduce search engine loading times"
          ],
          answer: "To stay informed about newly available data and sources",
          points: 1.0,
          type: "1.1",
          level: "master"
      },
      {
          title: "Question 13",
          question: "Which of the following factors indicates that a source is credible?",
          options: [
              "It is frequently shared on social media",
              "It is published by a reputable organization or expert",
              "It includes many advertisements",
              "It is visually appealing"
          ],
          answer: "It is published by a reputable organization or expert",
          points: 1.0,
          type: "1.2",
          level: "basic"
      },
      {
          title: "Question 14",
          question: "How can you determine whether information in an article is up to date?",
          options: [
              "Check the publication date",
              "Look at the number of likes or shares",
              "See if it appears on the first page of search results",
              "Ignore the author’s credentials"
          ],
          answer: "Check the publication date",
          points: 1.0,
          type: "1.2",
          level: "basic"
      },
      {
          title: "Question 15",
          question: "What is an important step in critically evaluating data?",
          options: [
              "Ignoring contradictory information",
              "Checking for bias in the data collection method",
              "Using data from unknown sources",
              "Prioritizing data that agrees with your opinion"
          ],
          answer: "Checking for bias in the data collection method",
          points: 1.0,
          type: "1.2",
          level: "basic"
      },
      {
          title: "Question 16",
          question: "How should you approach conflicting data from different sources?",
          options: [
              "Disregard the conflicting data entirely",
              "Compare the methodologies and context of each source",
              "Choose the one that supports your viewpoint",
              "Focus on the most recent data only"
          ],
          answer: "Compare the methodologies and context of each source",
          points: 1.0,
          type: "1.2",
          level: "basic"
      },
      {
          title: "Question 17",
          question: "What is the best way to store data for easy retrieval later?",
          options: [
              "Save it all in one folder without categorization",
              "Use a clear organizational structure with folders and subfolders",
              "Keep everything in one file on your desktop",
              "Store data randomly without naming files"
          ],
          answer: "Use a clear organizational structure with folders and subfolders",
          points: 1.0,
          type: "1.2",
          level: "basic"
      },
      {
          title: "Question 18",
          question: "How can cloud storage help with managing data?",
          options: [
              "It automatically categorizes files",
              "It allows access to data from multiple devices",
              "It limits your data storage capacity",
              "It only works offline"
          ],
          answer: "It allows access to data from multiple devices",
          points: 1.0,
          type: "1.2",
          level: "basic"
      },
      {
          title: "Question 19",
          question: "Why is it important to cross-check information from multiple sources?",
          options: [
              "To get a variety of opinions",
              "To ensure consistency and accuracy across different sources",
              "To increase the number of articles you’ve read",
              "To speed up the research process"
          ],
          answer: "To ensure consistency and accuracy across different sources",
          points: 1.0,
          type: "1.2",
          level: "master"
      },
      {
          title: "Question 20",
          question: "How can you verify the accuracy of data found online?",
          options: [
              "By relying on the first search result",
              "By checking if the data is cited in other reputable sources",
              "By searching only for visuals",
              "By trusting information without sources"
          ],
          answer: "By checking if the data is cited in other reputable sources",
          points: 1.0,
          type: "1.2",
          level: "master"
      },
      {
          title: "Question 21",
          question: "Which of the following helps ensure data is accurate and reliable?",
          options: [
              "Peer review by experts in the field",
              "High social media engagement",
              "Clear formatting and design",
              "Paid content from influencers"
          ],
          answer: "Peer review by experts in the field",
          points: 1.0,
          type: "1.2",
          level: "master"
      },
      {
          title: "Question 22",
          question: "What is a key consideration when interpreting data in context?",
          options: [
              "Whether the data aligns with popular opinion",
              "How the data was collected and what it represents",
              "How the data looks in a presentation",
              "Whether the data is easy to understand"
          ],
          answer: "How the data was collected and what it represents",
          points: 1.0,
          type: "1.2",
          level: "master"
      },
      {
          title: "Question 23",
          question: "How can you add metadata to improve data organization?",
          options: [
              "By tagging files with relevant keywords",
              "By copying files into multiple folders",
              "By deleting unnecessary files",
              "By only using metadata for images"
          ],
          answer: "By tagging files with relevant keywords",
          points: 1.0,
          type: "1.2",
          level: "master"
      },
      {
          title: "Question 24",
          question: "What is a benefit of using file synchronization tools?",
          options: [
              "They help transfer data between unrelated devices",
              "They allow access to updated files across multiple devices",
              "They automatically remove old files",
              "They organize files into specific formats"
          ],
          answer: "They allow access to updated files across multiple devices",
          points: 1.0,
          type: "1.2",
          level: "master"
      },
      {
          title: "Question 25",
          question: "What is the best way to store data for easy retrieval later?",
          options: [
              "Save it all in one folder without categorization",
              "Use a clear organizational structure with folders and subfolders",
              "Keep everything in one file on your desktop",
              "Store data randomly without naming files"
          ],
          answer: "Use a clear organizational structure with folders and subfolders",
          points: 1.0,
          type: "1.3",
          level: "basic"
      },
      {
          title: "Question 26",
          question: "How can cloud storage help with managing data?",
          options: [
              "It automatically categorizes files",
              "It allows access to data from multiple devices",
              "It limits your data storage capacity",
              "It only works offline"
          ],
          answer: "It allows access to data from multiple devices",
          points: 1.0,
          type: "1.3",
          level: "basic"
      },
      {
          title: "Question 27",
          question: "Which of the following is a good practice for file naming?",
          options: [
              "Use random letters and numbers",
              "Create descriptive, consistent file names that reflect content",
              "Avoid using dates in file names",
              "Name files after the website you found them on"
          ],
          answer: "Create descriptive, consistent file names that reflect content",
          points: 1.0,
          type: "1.3",
          level: "basic"
      },
      {
          title: "Question 28",
          question: "Which of the following is an example of using a structured environment to process data?",
          options: [
              "Creating a spreadsheet to organize and analyze data",
              "Saving files in random locations on your computer",
              "Relying only on memory to store information",
              "Keeping physical notes for digital content"
          ],
          answer: "Creating a spreadsheet to organize and analyze data",
          points: 1.0,
          type: "1.3",
          level: "basic"
      },
      {
          title: "Question 29",
          question: "What can databases help you do when managing large amounts of data?",
          options: [
              "Slow down the data analysis process",
              "Sort, filter, and analyze information efficiently",
              "Store only text-based data",
              "Limit access to data"
          ],
          answer: "Sort, filter, and analyze information efficiently",
          points: 1.0,
          type: "1.3",
          level: "basic"
      },
      {
          title: "Question 30",
          question: "How can data visualization tools assist in processing information?",
          options: [
              "By making data more visually appealing without context",
              "By helping to identify patterns and trends in large datasets",
              "By simplifying data without any analysis",
              "By hiding data behind charts"
          ],
          answer: "By helping to identify patterns and trends in large datasets",
          points: 1.0,
          type: "1.3",
          level: "basic"
      },
      {
          title: "Question 31",
          question: "Why is it important to back up your data regularly?",
          options: [
              "To save storage space",
              "To ensure that you don’t lose important information",
              "To keep files scattered across devices",
              "To avoid accessing your data frequently"
          ],
          answer: "To ensure that you don’t lose important information",
          points: 1.0,
          type: "1.3",
          level: "master"
      },
      {
          title: "Question 32",
          question: "How can you add metadata to improve data organization?",
          options: [
              "By tagging files with relevant keywords",
              "By copying files into multiple folders",
              "By deleting unnecessary files",
              "By only using metadata for images"
          ],
          answer: "By tagging files with relevant keywords",
          points: 1.0,
          type: "1.3",
          level: "master"
      },
      {
          title: "Question 33",
          question: "What is a benefit of using file synchronization tools?",
          options: [
              "They help transfer data between unrelated devices",
              "They allow access to updated files across multiple devices",
              "They automatically remove old files",
              "They organize files into specific formats"
          ],
          answer: "They allow access to updated files across multiple devices",
          points: 1.0,
          type: "1.3",
          level: "master"
      },
      {
          title: "Question 34",
          question: "Why is it important to apply consistent methods for organizing and processing data?",
          options: [
              "To ensure the accuracy and reliability of your findings",
              "To create a disorganized database",
              "To prevent collaboration on projects",
              "To make the process slower"
          ],
          answer: "To ensure the accuracy and reliability of your findings",
          points: 1.0,
          type: "1.3",
          level: "master"
      },
      {
          title: "Question 35",
          question: "What is one advantage of using automation tools for repetitive data tasks?",
          options: [
              "It increases the risk of errors",
              "It saves time and improves accuracy",
              "It complicates the analysis process",
              "It requires manual data entry"
          ],
          answer: "It saves time and improves accuracy",
          points: 1.0,
          type: "1.3",
          level: "master"
      },
      {
          title: "Question 36",
          question: "How can you best manage complex datasets for easy analysis?",
          options: [
              "Use multiple spreadsheets without linking them",
              "Structure the data in a database or spreadsheet for sorting and filtering",
              "Avoid using any digital tools",
              "Store the data in unstructured formats like text files"
          ],
          answer: "Structure the data in a database or spreadsheet for sorting and filtering",
          points: 1.0,
          type: "1.3",
          level: "master"
      },
      {
          title: "Question 1",
          question: "Which of the following tools is more appropriate to send an institutional newsletter?",
          options: [
              "Email",
              "Snapchat",
              "WhatsApp",
              "Instagram"
          ],
          answer: "Email",
          points: 1.0,
          type: "2.1",
          level: "basic"
      },
      {
          title: "Question 2",
          question: "Select the correct matching of the following online platforms with their primary use:",
          options: [
              "Zoom: Record videos",
              "WhatsApp: Microblogging",
              "MS Teams: Online classes",
              "X: Instant messaging"
          ],
          answer: "MS Teams: Online classes",
          points: 1.0,
          type: "2.1",
          level: "basic"
      },
      {
          title: "Question 3",
          question: "When communicating through digital technologies, it is essential to be aware of _______ to ensure that your message is received as intended and to avoid misunderstandings.",
          options: [
              "Context",
              "Grammar",
              "Spelling",
              "Language"
          ],
          answer: "Context",
          points: 1.0,
          type: "2.1",
          level: "basic"
      },
      {
          title: "Question 4",
          question: "You are collaborating on a project with a team that needs quick feedback. Which digital tool is most appropriate?",
          options: [
              "Email",
              "Instant Messaging (e.g., Slack, Microsoft Teams, WhatsApp)",
              "Social Media",
              "Video Conference"
          ],
          answer: "Instant Messaging (e.g., Slack, Microsoft Teams, WhatsApp)",
          points: 1.0,
          type: "2.1",
          level: "basic"
      },
      {
          title: "Question 5",
          question: "You are notifying your tutor about a missed deadline. What is the most appropriate way to communicate this?",
          options: [
              "Text message",
              "Formal email",
              "Social media post",
              "Phone call"
          ],
          answer: "Formal email",
          points: 1.0,
          type: "2.1",
          level: "basic"
      },
      {
          title: "Question 6",
          question: "You are discussing a sensitive topic with a colleague. Which method should you choose?",
          options: [
              "Group chat",
              "Video call",
              "Public forum",
              "Direct message"
          ],
          answer: "Video call",
          points: 1.0,
          type: "2.1",
          level: "basic"
      },
      {
          title: "Question 7",
          question: "Imagine you ordered a student’s book online on a website, and you are having trouble tracking the order. Which sentence (input) would be the most effective way of asking a virtual assistant (bot) to look for your latest order?",
          options: [
              "“Look for my book.”",
              "“Where is my order?”",
              "“Track down order no. XD1035GH”",
              "“Hello, I need something.”"
          ],
          answer: "“Track down order no. XD1035GH”",
          points: 1.0,
          type: "2.1",
          level: "master"
      },
      {
          title: "Question 8",
          question: "When interacting with generative AI platforms (e.g., ChatGPT), what is the most appropriate way of writing the input to obtain accurate results?",
          options: [
              "Asking questions.",
              "Providing detailed instructions.",
              "Giving data.",
              "Using only keywords"
          ],
          answer: "Providing detailed instructions.",
          points: 1.0,
          type: "2.1",
          level: "master"
      },
      {
          title: "Question 9",
          question: "Which of the following is a key factor in choosing the appropriate digital communication tool for an academic presentation?",
          options: [
              "The colour scheme of the tool",
              "The tool’s ability to support multimedia and screen sharing",
              "The tool’s popularity among my friends",
              "The tool’s integration with social media"
          ],
          answer: "The tool’s ability to support multimedia and screen sharing",
          points: 1.0,
          type: "2.1",
          level: "master"
      },
      {
          title: "Question 10",
          question: "You are asked to present a new software feature to a group of colleagues. What is the most appropriate method of communication?",
          options: [
              "An informal blog post",
              "A detailed email with attachments",
              "A live demo via videocall",
              "A recorded video message"
          ],
          answer: "A live demo via videocall",
          points: 1.0,
          type: "2.1",
          level: "master"
      },
      {
          title: "Question 11",
          question: "You are the class representative and need to make an announcement that affects all students. Which communication channel is most effective?",
          options: [
              "Team chat application",
              "Email blast",
              "Video conference",
              "WhatsApp Group"
          ],
          answer: "Video conference",
          points: 1.0,
          type: "2.1",
          level: "master"
      },
      {
          title: "Question 12",
          question: "You and your classmates are developing a project for a curricular unit. Which of the following platforms would help your group keep track of the ongoing tasks?",
          options: [
              "Trello",
              "Discord",
              "Slack",
              "Email"
          ],
          answer: "Trello",
          points: 1.0,
          type: "2.1",
          level: "master"
      },
      {
          title: "2.2 B1",
          question: "Which of the following best defines 'data sharing'?",
          options: [
              "Distributing data without any conditions",
              "Collaborating with others to exchange data for mutual benefit",
              "Discussing data on social media",
              "Only discussing data verbally without sharing files"
          ],
          answer: "Collaborating with others to exchange data for mutual benefit",
          points: 1.0,
          type: "2.2",
          level: "basic"
      },
      {
          title: "2.2 B2",
          question: "If you come across an infographic online and want to share it on social media, what should you do?",
          options: [
              "Post it without any changes.",
              "Appraise its credibility and include attribution to the creator.",
              "Share it as your own.",
              "Only share it if you remember who created it."
          ],
          answer: "Appraise its credibility and include attribution to the creator.",
          points: 1.0,
          type: "2.2",
          level: "basic"
      },
      {
          title: "2.2 B3",
          question: "Suppose you need to share a file with your classmates which has approximately 1.4GB, which platform would you use?",
          options: [
              "Email",
              "WhatsApp",
              "WeTransfer",
              "Messenger"
          ],
          answer: "WeTransfer",
          points: 1.0,
          type: "2.2",
          level: "basic"
      },
      {
          title: "2.2 B4",
          question: "Select the most correct answer about software licensing:",
          options: [
              "I can download and share any software I find online",
              "All purchased licenses are for lifetime use",
              "Licensing rights usually depends on the purpose of usage and number of users",
              "I can only download open-source software"
          ],
          answer: "Licensing rights usually depends on the purpose of usage and number of users",
          points: 1.0,
          type: "2.2",
          level: "basic"
      },
      {
          title: "2.2 B5",
          question: "Which information is important when citing an online book in the bibliographic references?",
          options: [
              "Authors and website link",
              "Website link",
              "Authors, year, title, publisher and website link",
              "Year, pages and title"
          ],
          answer: "Authors, year, title, publisher and website link",
          points: 1.0,
          type: "2.2",
          level: "basic"
      },
      {
          title: "2.2 B6",
          question: "Which images can you share online?",
          options: [
              "Any images from Google Images",
              "Only copyright free pictures",
              "Any images from the Internet",
              "Only copyright free images or authorised by authors."
          ],
          answer: "Only copyright free images or authorised by authors.",
          points: 1.0,
          type: "2.2",
          level: "basic"
      },
      {
          title: "2.2 M1",
          question: "You found an interesting picture online which is protected by the following creative commons license. How can you reuse it?",
          options: [
              "Modify the colours of the picture and use it in a presentation, displaying the author and CC logo",
              "Printing the picture on a package with the CC logo and sell it",
              "Share the picture on social media",
              "Use the picture on my profile"
          ],
          answer: "Modify the colours of the picture and use it in a presentation, displaying the author and CC logo",
          points: 1.0,
          type: "2.2",
          level: "master"
      },
      {
          title: "2.2 M2",
          question: "When using images in school tasks that you found online, which is the most acceptable way to give attribution?",
          options: [
              "'Found it online'.",
              "'Source: Google Images'.",
              "'Image by [Author Name] via [Website]'.",
              "No attribution is needed for shared links."
          ],
          answer: "'Image by [Author Name] via [Website]'.",
          points: 1.0,
          type: "2.2",
          level: "master"
      },
      {
          title: "2.2 M3",
          question: "The following paper was found on a publisher’s website: Robertson, C. T. (2023). Defining News from an Audience Perspective at a Time of Crisis in the United States. Journalism Practice, 17(2), 374–390. https://doi.org/10.1080/17512786.2021.1919178. Which facts regarding this article is correct?",
          options: [
              "Author: Robertson, title: Journalism Practice, pages: 374-390.",
              "Author: Robertson, journal: Journalism Practice, pages: 374-390.",
              "Author: C.T., volume: 17, issue: 2.",
              "Title: Journalism Practice, pages: 374-390, publisher: doi.org"
          ],
          answer: "Author: Robertson, journal: Journalism Practice, pages: 374-390.",
          points: 1.0,
          type: "2.2",
          level: "master"
      },
      {
          title: "2.2 M4",
          question: "Which music can be shared in a publication on social media?",
          options: [
              "Any song",
              "Only the ones allowed by the platform",
              "Old songs",
              "Songs in which the artist has died 70 years ago"
          ],
          answer: "Songs in which the artist has died 70 years ago",
          points: 1.0,
          type: "2.2",
          level: "master"
      },
      {
          title: "2.2 M5",
          question: "If you go to Brussels, which of the following images can you not share online for commercial use, at least until 2076?",
          options: [
              "A picture of me and my friends at the Atomium",
              "A picture of me walking down the streets",
              "A picture of me and my friends at the Grand Place",
              "A picture of my friend eating chocolate with their consent"
          ],
          answer: "A picture of me and my friends at the Atomium",
          points: 1.0,
          type: "2.2",
          level: "master"
      },
      {
          title: "2.2 M6",
          question: "Which action does not violate intellectual property rights?",
          options: [
              "Download and use public domain databases",
              "Lending passwords to friends to access paid content",
              "Download software from torrent websites",
              "Record parts of a TV show and upload it on YouTube."
          ],
          answer: "Download and use public domain databases",
          points: 1.0,
          type: "2.2",
          level: "master"
      },
      {
          title: "2.3 B1",
          question: "Which of the following is a digital service often used for paying university fees?",
          options: [
              "Facebook",
              "WeTransfer",
              "Online banking",
              "Instagram"
          ],
          answer: "Online banking",
          points: 1.0,
          type: "2.3",
          level: "basic"
      },
      {
          title: "2.3 B2",
          question: "Select the correct matching of the digital services with the most appropriate function.",
          options: [
              "Government website: Access public information and services",
              "Social media: Sign and support causes",
              "Online petition: Take courses and acquire new skills",
              "E-learning platform: Engage in discussions and share opinions"
          ],
          answer: "Government website: Access public information and services",
          points: 1.0,
          type: "2.3",
          level: "basic"
      },
      {
          title: "2.3 B3",
          question: "Which is the most effective way of contacting the director of your university degree programme?",
          options: [
              "WhatsApp",
              "Email",
              "Instagram",
              "Mobile call"
          ],
          answer: "Email",
          points: 1.0,
          type: "2.3",
          level: "basic"
      },
      {
          title: "2.3 B4",
          question: "Which of the following is an example of using digital technology to participate in civic engagement?",
          options: [
              "Shopping online",
              "Voting through a secure online platform",
              "Streaming movies",
              "Social media scrolling"
          ],
          answer: "Voting through a secure online platform",
          points: 1.0,
          type: "2.3",
          level: "basic"
      },
      {
          title: "2.3 B5",
          question: "What role do social media platforms play in civic engagement?",
          options: [
              "They promote consumerism",
              "They serve as a tool for information dissemination and mobilization",
              "They hinder public discourse",
              "They are only for personal connections"
          ],
          answer: "They serve as a tool for information dissemination and mobilization",
          points: 1.0,
          type: "2.3",
          level: "basic"
      },
      {
          title: "2.3 B6",
          question: "Select the incorrect matching pair of the digital technology with its civic engagement function:",
          options: [
              "Online petitions: Gathering public support for causes",
              "Social media campaigns: Collecting signatures for a political party",
              "E-Government services: Accessing government services",
              "Crowdfunding platforms: Fundraising for community projects"
          ],
          answer: "Social media campaigns: Collecting signatures for a political party",
          points: 1.0,
          type: "2.3",
          level: "basic"
      },
      {
          title: "2.3 M1",
          question: "Which digital technology can enhance transparency and accountability in civic engagement?",
          options: [
              "Virtual reality",
              "Blockchain",
              "Augmented reality",
              "Fitness trackers"
          ],
          answer: "Blockchain",
          points: 1.0,
          type: "2.3",
          level: "master"
      },
      {
          title: "2.3 M2",
          question: "You are supposed to write an essay on student perspectives about the use of mobile phones in the classroom. Which of the following instruments would be most appropriate to collect their opinions?",
          options: [
              "Survey",
              "Spreadsheets",
              "Mobile calls",
              "Email"
          ],
          answer: "Survey",
          points: 1.0,
          type: "2.3",
          level: "master"
      },
      {
          title: "2.3 M3",
          question: "What could be the risks of having an AI algorithm predicting your grade in a certain curricular unit? Choose the most appropriate answer.",
          options: [
              "AI may discourage me to continue improving my study habits.",
              "AI predictions might introduce bias, potentially affecting how teachers view and support students.",
              "AI systems can replace the role of the teacher.",
              "AI prediction models would always grade me wrongly."
          ],
          answer: "AI predictions might introduce bias, potentially affecting how teachers view and support students.",
          points: 1.0,
          type: "2.3",
          level: "master"
      },
      {
          title: "2.3 M4",
          question: "Select the correct matching between the concept and its definition:",
          options: [
              "Digital divide: The gap between those who have access to digital technologies and those who do not",
              "E-participation: Technologies designed to facilitate civic engagement",
              "Civic Data: The use of digital tools for public participation in governance",
              "Civic Tech: Data that is made publicly available for transparency and analysis"
          ],
          answer: "Digital divide: The gap between those who have access to digital technologies and those who do not",
          points: 1.0,
          type: "2.3",
          level: "master"
      },
      {
          title: "2.3 M5",
          question: "A community organisation wants to increase awareness about local issues using digital tools. Which approach is most effective?",
          options: [
              "Creating a website with static information",
              "Launching an interactive social media campaign",
              "Sending out paper flyers",
              "Holding a single event without follow-up"
          ],
          answer: "Launching an interactive social media campaign",
          points: 1.0,
          type: "2.3",
          level: "master"
      },
      {
          title: "2.3 M6",
          question: "Select the correct matching of the digital technology with its relevant feature or benefit in promoting participatory citizenship:",
          options: [
              "Social media platforms: Offer resources and tools for effective civic engagement to advocate for the most vulnerable.",
              "Online voting systems: Provide platforms for amplifying marginalised voices.",
              "Digital advocacy tools: Facilitate collective action and gather community input.",
              "Civic tech websites: Enable real-time feedback and discussions among citizens."
          ],
          answer: "Civic tech websites: Enable real-time feedback and discussions among citizens.",
          points: 1.0,
          type: "2.3",
          level: "master"
      },
      {
          title: "2.4 B1",
          question: "Which of the following is a benefit of using collaborative tools like Google Docs or Sheets for group projects?",
          options: [
              "Limited access",
              "Real-time updates",
              "Requires expensive software",
              "Works only offline"
          ],
          answer: "Real-time updates",
          points: 1.0,
          type: "2.4",
          level: "basic"
      },
      {
          title: "2.4 B2",
          question: "Which of the following tools can help collecting feedback from your classmates?",
          options: [
              "Mentimeter",
              "Adobe Illustrator",
              "MS Sharepoint",
              "MS PowerPoint"
          ],
          answer: "Mentimeter",
          points: 1.0,
          type: "2.4",
          level: "basic"
      },
      {
          title: "2.4 B3",
          question: "Imagine you are publishing a post on Instagram about an upcoming hackathon at your university. Which hashtags are more appropriate to attract other students to the site?",
          options: [
              "#hackaton #university",
              "#comevisit #events",
              "#hackaton #[name of the university] #[name of the event and year]",
              "#city #programming"
          ],
          answer: "#hackaton #[name of the university] #[name of the event and year]",
          points: 1.0,
          type: "2.4",
          level: "basic"
      },
      {
          title: "2.4 B4",
          question: "Which of the following best describes co-creation in the context of digital tools?",
          options: [
              "Individuals creating content independently",
              "Collaboration between multiple stakeholders to create shared resources",
              "Using technology for personal projects",
              "Collecting data without stakeholder input"
          ],
          answer: "Collaboration between multiple stakeholders to create shared resources",
          points: 1.0,
          type: "2.4",
          level: "basic"
      },
      {
          title: "2.4 B5",
          question: "What is a primary benefit of using collaborative platforms like Google Docs for co-construction of knowledge?",
          options: [
              "It allows for unlimited storage",
              "It enables real-time collaboration and feedback",
              "It enhances data privacy",
              "It requires no internet connection"
          ],
          answer: "It enables real-time collaboration and feedback",
          points: 1.0,
          type: "2.4",
          level: "basic"
      },
      {
          title: "2.4 B6",
          question: "Select the correct matching of the digital tools with its co-creation function:",
          options: [
              "Collaborative mapping tools: Gathering diverse input from the public",
              "Crowdsourcing platforms: Allowing multiple users to edit and update information",
              "Wikis: Visualising data and ideas spatially",
              "Online survey tools: Collecting opinions and data from stakeholders"
          ],
          answer: "Online survey tools: Collecting opinions and data from stakeholders",
          points: 1.0,
          type: "2.4",
          level: "basic"
      },
      {
          title: "2.4 M1",
          question: "What is the primary function of version control software like Git in collaborative projects?",
          options: [
              "To edit images",
              "To track changes in documents and code",
              "To create presentations",
              "To manage emails"
          ],
          answer: "To track changes in documents and code",
          points: 1.0,
          type: "2.4",
          level: "master"
      },
      {
          title: "2.4 M2",
          question: "In a collaborative setting, what is the main purpose of using a shared calendar tool like Google Calendar?",
          options: [
              "To keep track of personal tasks",
              "To share deadlines and schedule meetings",
              "To send email newsletters",
              "To create to-do lists"
          ],
          answer: "To share deadlines and schedule meetings",
          points: 1.0,
          type: "2.4",
          level: "master"
      },
      {
          title: "2.4 M3",
          question: "What is the primary purpose of a repository in GitHub?",
          options: [
              "To store and share code",
              "To send emails to collaborators",
              "To create presentations",
              "To host a website"
          ],
          answer: "To store and share code",
          points: 1.0,
          type: "2.4",
          level: "master"
      },
      {
          title: "2.4 M4",
          question: "What is the purpose of using the 'track changes' option on MS Word?",
          options: [
              "To keep track of the version history",
              "To know where and who made any changes to the document",
              "To mark-up any errors",
              "To report any issues"
          ],
          answer: "To know where and who made any changes to the document",
          points: 1.0,
          type: "2.4",
          level: "master"
      },
      {
          title: "2.4 M5",
          question: "A research team is using an online platform to collect data from participants and include themselves in the analysis. What approach are they using?",
          options: [
              "Closed research methods",
              "Citizen science",
              "Traditional surveys",
              "Data mining"
          ],
          answer: "Citizen science",
          points: 1.0,
          type: "2.4",
          level: "master"
      },
      {
          title: "2.4 M6",
          question: "Which term defines reusing and changing someone else’s creation or code in the digital world?",
          options: [
              "Adaptation",
              "Remixing",
              "Apud",
              "Reusing"
          ],
          answer: "Remixing",
          points: 1.0,
          type: "2.4",
          level: "master"
      },

      {
          title: "2.5 B1",
          question: "Which of the following is an example of good netiquette in email communication?",
          options: [
              "Using all capital letters",
              "Sending multiple emails in a short period of time",
              "Including a clear subject line",
              "Ignoring spelling and grammar"
          ],
          answer: "Including a clear subject line",
          points: 1.0,
          type: "2.5",
          level: "basic"
      },
      {
          title: "2.5 B2",
          question: "How would you respond to a personal attack or provocation that violate the rules of an online moderated discussion group?",
          options: [
              "Inform the moderator",
              "Wait for other members to come to my defence",
              "Try to reason with the offender",
              "Post something in reaction to the attack"
          ],
          answer: "Inform the moderator",
          points: 1.0,
          type: "2.5",
          level: "basic"
      },
      {
          title: "2.5 B3",
          question: "What should you do when receiving an unwanted email?",
          options: [
              "Reply back",
              "Move it to the trash bin",
              "Signal as spam and move it to the trash bin",
              "Unsubscribe"
          ],
          answer: "Signal as spam and move it to the trash bin",
          points: 1.0,
          type: "2.5",
          level: "basic"
      },
      {
          title: "2.5 B4",
          question: "You are late for an online class and enter the video call in the middle of the session. What should you do?",
          options: [
              "Turn the camera on and wave to the teacher",
              "Turn the microphone on and say you arrived",
              "Ask the teacher to recap",
              "Acknowledge your attendance in the chat without interrupting"
          ],
          answer: "Acknowledge your attendance in the chat without interrupting",
          points: 1.0,
          type: "2.5",
          level: "basic"
      },
      {
          title: "2.5 B5",
          question: "What best practices are recommended for attending a remote class?",
          options: [
              "Turn the camera off and stay on mute all the time",
              "Turn the camera on and stay on mute when someone else is speaking",
              "Keep the microphone on all the time",
              "Turn the camera on using personalised backgrounds"
          ],
          answer: "Turn the camera on and stay on mute when someone else is speaking",
          points: 1.0,
          type: "2.5",
          level: "basic"
      },
      {
          title: "2.5 B6",
          question: "You need to interrupt your teacher in an online class, what should you do?",
          options: [
              "Use the raise hand feature and wait for my turn",
              "Turn the camera on and raise my hand",
              "Use the microphone and ask for permission",
              "Send a private message to the teacher"
          ],
          answer: "Use the raise hand feature and wait for my turn",
          points: 1.0,
          type: "2.5",
          level: "basic"
      },
      {
          title: "2.5 M1",
          question: "When presenting a group work to your peers, which of the following strategies might be most effective?",
          options: [
              "Using formal language and long paragraphs",
              "Incorporating visuals and concise language",
              "Avoiding interactive elements",
              "Emphasizing traditional methods of communication"
          ],
          answer: "Incorporating visuals and concise language",
          points: 1.0,
          type: "2.5",
          level: "master"
      },
      {
          title: "2.5 M2",
          question: "What, for instance, is considered hate speech on social media?",
          options: [
              "Direct attack against institutions",
              "Insulting a political party",
              "Slurs that are used to attack people based on their ethnicity",
              "Enraged comments about a football match"
          ],
          answer: "Slurs that are used to attack people based on their ethnicity",
          points: 1.0,
          type: "2.5",
          level: "master"
      },
      {
          title: "2.5 M3",
          question: "Which of the following aspects would make an academic presentation more inclusive?",
          options: [
              "Adding as many colours as possible",
              "Using video subtitles with sans-serif fonts",
              "Talking loudly",
              "Writing uppercase words"
          ],
          answer: "Using video subtitles with sans-serif fonts",
          points: 1.0,
          type: "2.5",
          level: "master"
      },
      {
          title: "2.5 M4",
          question: "Supposing you see a publication of your friend on social media supporting a classmate that has recently changed genders. What would be the most appropriate approach to raise awareness on gender inclusiveness?",
          options: [
              "Do nothing, it is not of my business.",
              "Reply and say you disagree",
              "Like it and support them",
              "Report it to your teacher"
          ],
          answer: "Like it and support them",
          points: 1.0,
          type: "2.5",
          level: "master"
      },
      {
          title: "2.5 M5",
          question: "You have finished a paperwork on a Sunday, and you decide to send it to your teacher by email. What is the most polite behaviour?",
          options: [
              "Send the email right away",
              "Save it in the drafts",
              "Ask the teacher by chat if you can send it",
              "Automatically schedule to send the email on Monday morning"
          ],
          answer: "Automatically schedule to send the email on Monday morning",
          points: 1.0,
          type: "2.5",
          level: "master"
      },
      {
          title: "2.5 M6",
          question: "You want to schedule a virtual meeting with participants from various time zones, including both younger and older individuals. You notice that some prefer late-night meetings while others prefer mornings. What should you do?",
          options: [
              "Schedule the meeting at a time that works for you; others can adjust.",
              "Propose a few time options that suits you and use a poll to find a consensus on the best time.",
              "Choose the earliest time that suits your convenience and inform others afterward.",
              "Have everyone send their availability and then decide based on majority preference."
          ],
          answer: "Have everyone send their availability and then decide based on majority preference.",
          points: 1.0,
          type: "2.5",
          level: "master"
      },
      {
          title: "2.6 B1",
          question: "Which of the following is a good practice for managing multiple digital identities?",
          options: [
              "Using the same password for all accounts",
              "Keeping profile information consistent across platforms",
              "Regularly updating privacy settings for each account",
              "Ignoring security alerts"
          ],
          answer: "Regularly updating privacy settings for each account",
          points: 1.0,
          type: "2.6",
          level: "basic"
      },
      {
          title: "2.6 B2",
          question: "Which of the following practices is most effective for managing your digital identity and protecting your online reputation?",
          options: [
              "Sharing personal information freely on social media to connect with more people.",
              "Regularly updating privacy settings on social media accounts and being mindful of what I post",
              "Using the same password across multiple platforms for easier access.",
              "Ignoring comments and feedback on my online profiles to avoid confrontation."
          ],
          answer: "Regularly updating privacy settings on social media accounts and being mindful of what I post",
          points: 1.0,
          type: "2.6",
          level: "basic"
      },
      {
          title: "2.6 B3",
          question: "What is the best strategy for managing the data you produce online to protect your digital identity?",
          options: [
              "Post frequently without considering the impact of the content on my reputation.",
              "Regularly review and delete outdated or irrelevant posts and accounts.",
              "Allow all applications to access my social media accounts without restrictions.",
              "Share sensitive information publicly to gain trust and credibility."
          ],
          answer: "Regularly review and delete outdated or irrelevant posts and accounts.",
          points: 1.0,
          type: "2.6",
          level: "basic"
      },
      {
          title: "2.6 B4",
          question: "Which content directly threatens personal safety on social media?",
          options: [
              "Fake news",
              "Unsolicited advertising",
              "Unsolicited direct message",
              "Harassment and blackmailing"
          ],
          answer: "Harassment and blackmailing",
          points: 1.0,
          type: "2.6",
          level: "basic"
      },
      {
          title: "2.6 B5",
          question: "Is it appropriate to share a picture with minors (eg. underaged siblings or cousins) on social media?",
          options: [
              "No, never.",
              "Yes, because it is a private space.",
              "Yes, as long as I ask their parents.",
              "Yes, only If I do not show parts of their body that allow them to be recognised."
          ],
          answer: "Yes, only If I do not show parts of their body that allow them to be recognised.",
          points: 1.0,
          type: "2.6",
          level: "basic"
      },
      {
          title: "2.6 B6",
          question: "You’re applying for a new job and realise that your social media profiles are public. You have some posts that may not align with your professional image. What should you do?",
          options: [
              "Leave everything as it is; the employer shouldn’t judge you based on personal posts.",
              "Review and update your privacy settings to restrict who can see your posts.",
              "Delete all posts from the last five years.",
              "Create a separate professional account for job-related connections."
          ],
          answer: "Review and update your privacy settings to restrict who can see your posts.",
          points: 1.0,
          type: "2.6",
          level: "basic"
      },
      {
          title: "2.6 M1",
          question: "What is one way to protect your personal data when creating online accounts?",
          options: [
              "Using easy-to-remember passwords",
              "Sharing your password with friends",
              "Enabling two-factor authentication",
              "Avoiding the use of privacy settings"
          ],
          answer: "Enabling two-factor authentication",
          points: 1.0,
          type: "2.6",
          level: "master"
      },
      {
          title: "2.6 M2",
          question: "How would you prevent mobile apps from collecting residual data from your device?",
          options: [
              "Turning off geolocation and AI system tracking",
              "Enabling the microphone",
              "Turning off the camera",
              "Choosing 'airplane mode'"
          ],
          answer: "Turning off geolocation and AI system tracking",
          points: 1.0,
          type: "2.6",
          level: "master"
      },
      {
          title: "2.6 M3",
          question: "What metainformation is possible to be collected by tech companies from a selfie taken with your mobile phone?",
          options: [
              "Name",
              "Location",
              "Location, age, gender, personality traits, search history, and general interests",
              "Name and phone number"
          ],
          answer: "Location, age, gender, personality traits, search history, and general interests",
          points: 1.0,
          type: "2.6",
          level: "master"
      },
      {
          title: "2.6 M4",
          question: "What should you do if someone steals your online identity (eg. social media profile)?",
          options: [
              "Try to negotiate with the person who stole it.",
              "Contact the local authorities",
              "Report the issue to the platform and change all passwords.",
              "Create another profile."
          ],
          answer: "Report the issue to the platform and change all passwords.",
          points: 1.0,
          type: "2.6",
          level: "master"
      },
      {
          title: "2.6 M5",
          question: "An official way to report any violations you had with your data is by contacting:",
          options: [
              "The local authorities",
              "The EU’s Data Protection Officer",
              "The Ministry of Defence",
              "The city hall"
          ],
          answer: "The EU’s Data Protection Officer",
          points: 1.0,
          type: "2.6",
          level: "master"
      },
      {
          title: "2.6 M6",
          question: "According to the GDPR, for how long can a given organisation store your personal data?",
          options: [
              "For as long as they wish",
              "For the shortest time possible",
              "For 3 years",
              "Until I tell them to remove"
          ],
          answer: "For the shortest time possible",
          points: 1.0,
          type: "2.6",
          level: "master"
      }, 
      {
          title: "3.1 B1",
          question: "What is digitizing?",
          options: [
              "Converting analogue to digital information",
              "Converting images to vectors",
              "Capturing large files",
              "Digital transformation"
          ],
          answer: "Converting analogue to digital information",
          points: 1.0,
          type: "3.1",
          level: "basic"
      },
      {
          title: "3.1 B2",
          question: "What is digital content?",
          options: [
              "Physical products sold online",
              "Any form of media created and shared online, such as text, images, or videos",
              "Paper-based advertisements",
              "None of the above"
          ],
          answer: "Any form of media created and shared online, such as text, images, or videos",
          points: 1.0,
          type: "3.1",
          level: "basic"
      },
      {
          title: "3.1 B3",
          question: "What elements can digital content contain?",
          options: [
              "E-books, blogs, articles, and newsletters",
              "Podcasts, music, and audiobooks",
              "Videos, movies, TV shows, and live streams",
              "All answers are correct"
          ],
          answer: "All answers are correct",
          points: 1.0,
          type: "3.1",
          level: "basic"
      },
      {
          title: "3.1 B4",
          question: "Which tool is most commonly used for graphic design?",
          options: [
              "Microsoft Excel",
              "Canva",
              "Microsoft PowerPoint",
              "Notepad"
          ],
          answer: "Canva",
          points: 1.0,
          type: "3.1",
          level: "basic"
      },
      {
          title: "3.1 B5",
          question: "What is 'HTML'?",
          options: [
              "A programming language",
              "A language for creating web pages",
              "Graphic design program",
              "Image editing software"
          ],
          answer: "A language for creating web pages",
          points: 1.0,
          type: "3.1",
          level: "basic"
      },
      {
          title: "3.1 B6",
          question: "Which media uses are the most appropriate with social media platforms?",
          options: [
              "Instagram",
              "TikTok",
              "Facebook",
              "All"
          ],
          answer: "All",
          points: 1.0,
          type: "3.1",
          level: "basic"
      },
      {
          title: "3.1 M1",
          question: "What six elements can be combined to create multimedia?",
          options: [
              "Colour, hypertext, images, music, voiceover and video",
              "Audio, hypertext, images, colour, music and animation",
              "Text, links, animation, video, sound effect and animation",
              "Audio, images, animation, hypertext, text and video"
          ],
          answer: "Audio, images, animation, hypertext, text and video",
          points: 1.0,
          type: "3.1",
          level: "master"
      },
      {
          title: "3.1 M2",
          question: "Which advanced technique is used to optimise digital content for search engines by understanding user intent and leveraging semantic keywords?",
          options: [
              "Keyword stuffing",
              "LSI (Latent Semantic Indexing)",
              "Backlink building",
              "Meta tag optimization"
          ],
          answer: "LSI (Latent Semantic Indexing)",
          points: 1.0,
          type: "3.1",
          level: "master"
      },
      {
          title: "3.1 M3",
          question: "Which software is commonly used for creating interactive multimedia?",
          options: [
              "Adobe Flash",
              "Adobe Illustrator",
              "Adobe After Effects",
              "Adobe Photoshop"
          ],
          answer: "Adobe Flash",
          points: 1.0,
          type: "3.1",
          level: "master"
      },
      {
          title: "3.1 M4",
          question: "What is the importance of SEO (search engine optimization) in digital content?",
          options: [
              "It helps the content reach the target audience better",
              "It has no significance",
              "It only improves the appearance of the content",
              "It reduces the popularity of the content"
          ],
          answer: "It helps the content reach the target audience better",
          points: 1.0,
          type: "3.1",
          level: "master"
      },
      {
          title: "3.1 M5",
          question: "What is 'responsive design'?",
          options: [
              "A design that automatically adapts to different devices",
              "A design intended only for computers",
              "Only text design",
              "A design that does not change"
          ],
          answer: "A design that automatically adapts to different devices",
          points: 1.0,
          type: "3.1",
          level: "master"
      },
      {
          title: "3.1 M6",
          question: "In the context of digital content creation, what is the primary function of a content management system (CMS)?",
          options: [
              "To track user engagement metrics",
              "To facilitate the creation, editing, and publishing of digital content",
              "To analyse competitors",
              "To create social media posts only"
          ],
          answer: "To facilitate the creation, editing, and publishing of digital content",
          points: 1.0,
          type: "3.1",
          level: "master"
      },
      {
          title: "3.2 B1",
          question: "Is it important to analyse which audience your digital content is aimed at?",
          options: [
              "Yes",
              "No"
          ],
          answer: "Yes",
          points: 1.0,
          type: "3.2",
          level: "basic"
      },
      {
          title: "3.2 B2",
          question: "Which of the following tools is commonly used to create AI-generated images or artwork?",
          options: [
              "Word Processor",
              "Spreadsheet Software",
              "Generative Adversarial Networks (GANs)",
              "Video Editing Software"
          ],
          answer: "Generative Adversarial Networks (GANs)",
          points: 1.0,
          type: "3.2",
          level: "basic"
      },
      {
          title: "3.2 B3",
          question: "Is the following sentence true or false? Sharing digital content online does not give the option to receive instant feedback on what has been published.",
          options: [
              "True",
              "False"
          ],
          answer: "False",
          points: 1.0,
          type: "3.2",
          level: "basic"
      },
      {
          title: "3.2 B4",
          question: "Is the following sentence true or false? The more engagement you have with your audience, the more visibility your content receives.",
          options: [
              "True",
              "False"
          ],
          answer: "True",
          points: 1.0,
          type: "3.2",
          level: "basic"
      },
      {
          title: "3.2 B5",
          question: "Is the following sentence true or false? Only the content has a targeted audience.",
          options: [
              "True",
              "False"
          ],
          answer: "False",
          points: 1.0,
          type: "3.2",
          level: "basic"
      },
      {
          title: "3.2 B6",
          question: "Who might make up your content target group?",
          options: [
              "a young audience",
              "people with a conservative approach to life",
              "elderly people",
              "all answers are correct"
          ],
          answer: "all answers are correct",
          points: 1.0,
          type: "3.2",
          level: "basic"
      },
      {
          title: "3.2 M1",
          question: "What is the primary benefit of adding captions to video presentations?",
          options: [
              "To increase video resolution",
              "To enhance accessibility for hearing-impaired viewers",
              "To reduce file size",
              "To improve video loading speed"
          ],
          answer: "To enhance accessibility for hearing-impaired viewers",
          points: 1.0,
          type: "3.2",
          level: "master"
      },
      {
          title: "3.2 M2",
          question: "You want to make an infographic about birth rate in your country. Which of the following is an online platform for data visualisation?",
          options: [
              "Flourish",
              "Canva",
              "Microsoft Power Point",
              "Google Forms"
          ],
          answer: "Flourish",
          points: 1.0,
          type: "3.2",
          level: "master"
      },
      {
          title: "3.2 M3",
          question: "Why is the integration of story maps into digital content important?",
          options: [
              "The integration of maps in a story allows you to make the content interactive and it is possible to increase engagement",
              "Story maps can help to deliver complicated subjects in an easy way.",
              "Mapping information is visual and the results address a wider audience.",
              "All answers are correct"
          ],
          answer: "All answers are correct",
          points: 1.0,
          type: "3.2",
          level: "master"
      },
      {
          title: "3.2 M4",
          question: "Finish the sentence: Identify digital tools to help make your digital content…..",
          options: [
              "more accessible only to the young target group.",
              "more inclusive and accessible and gain a basic understanding of the guidelines for ‘fair use’ in copyright and licensing.",
              "that will be highly sophisticated and complex."
          ],
          answer: "more inclusive and accessible and gain a basic understanding of the guidelines for ‘fair use’ in copyright and licensing.",
          points: 1.0,
          type: "3.2",
          level: "master"
      },
      {
          title: "3.2 M5",
          question: "What are the key advantages of having a blog?",
          options: [
              "you can select your publishing style: frequency, lengths, topic and other parameters.",
              "you can hide it or make it public",
              "All answers are correct"
          ],
          answer: "All answers are correct",
          points: 1.0,
          type: "3.2",
          level: "master"
      },
      {
          title: "3.2 M6",
          question: "Which of the following best describes a key step in integrating hardware sensors with digital technologies to create a smart home device?",
          options: [
              "Ensuring the device has a complex user interface",
              "Selecting appropriate sensors to collect relevant data",
              "Limiting connectivity options to reduce costs",
              "Designing the device to be operated only manually"
          ],
          answer: "Selecting appropriate sensors to collect relevant data",
          points: 1.0,
          type: "3.2",
          level: "master"
      },
      {
          title: "3.3 B1",
          question: "Software is protected by copyright which makes it illegal to what?",
          options: [
              "Purchase the software from a download website",
              "Make copies to give to family and friends",
              "Both statements"
          ],
          answer: "Make copies to give to family and friends",
          points: 1.0,
          type: "3.3",
          level: "basic"
      },
      {
          title: "3.3 B2",
          question: "Which of the following could be examples of Fair Use? (select all that apply)",
          options: [
              "Publishing quotes from a new book on a blog with an opinion piece reviewing it",
              "Setting an Instagram model’s picture as your profile pic on a dating app",
              "Playing a copyrighted song in the background of your video on your YouTube cooking tutorial channel",
              "Using copyrighted pictures in your PowerPoint presentation for a school project",
              "Publishing a copyrighted pic of a celebrity in your school newspaper to report on their recent arrest",
              "Writing a parody of a new pop song that makes fun of the message from the original"
          ],
          answer: [
              "Publishing quotes from a new book on a blog with an opinion piece reviewing it",
              "Using copyrighted pictures in your PowerPoint presentation for a school project",
              "Publishing a copyrighted pic of a celebrity in your school newspaper to report on their recent arrest",
              "Writing a parody of a new pop song that makes fun of the message from the original"
          ],
          points: 1.0,
          type: "3.3",
          level: "basic"
      },
      {
          title: "3.3 B3",
          question: "What is a Creative Commons license?",
          options: [
              "A type of software license that allows free sharing of open-source code",
              "A copyright license that enables creators to specify how others can use their work",
              "A tool to ensure all creative works are used for commercial purposes only",
              "A method to bypass copyright restrictions and use any work freely"
          ],
          answer: "A copyright license that enables creators to specify how others can use their work",
          points: 1.0,
          type: "3.3",
          level: "basic"
      },
      {
          title: "3.3 B4",
          question: "What is an important consideration when incorporating AI-generated content into your own work?",
          options: [
              "Ensuring the content is always free to use",
              "Clearly attributing the source of the AI-generated content",
              "Using the content without any modifications",
              "Ignoring copyright laws"
          ],
          answer: "Clearly attributing the source of the AI-generated content",
          points: 1.0,
          type: "3.3",
          level: "basic"
      },
      {
          title: "3.3 B5",
          question: "Which of the following is an example of a work protected by copyright?",
          options: [
              "A mathematical formula",
              "A photograph",
              "A business idea",
              "A company logo"
          ],
          answer: "A photograph",
          points: 1.0,
          type: "3.3",
          level: "basic"
      },
      {
          title: "3.3 B6",
          question: "If you want to use a copyrighted work, what should you do?",
          options: [
              "Modify it slightly",
              "Get permission from the copyright owner",
              "Use it for free if it’s for personal use",
              "Cite the source and use it freely"
          ],
          answer: "Get permission from the copyright owner",
          points: 1.0,
          type: "3.3",
          level: "basic"
      },
      {
          title: "3.3 M1",
          question: "Which of the following legal doctrines allows limited use of copyrighted works without permission under specific circumstances, such as commentary or criticism?",
          options: [
              "Digital Millennium Copyright Act (DMCA)",
              "Fair Use",
              "Public Domain",
              "Moral Rights"
          ],
          answer: "Fair Use",
          points: 1.0,
          type: "3.3",
          level: "master"
      },
      {
          title: "3.3 M2",
          question: "Which of the following is an example of 'copyleft' licensing in software development?",
          options: [
              "Apache License 2.0",
              "MIT License",
              "GNU General Public License (GPL)",
              "Creative Commons Zero (CC0)"
          ],
          answer: "GNU General Public License (GPL)",
          points: 1.0,
          type: "3.3",
          level: "master"
      },
      {
          title: "3.3 M3",
          question: "In the context of text and data mining (TDM), which EU directive facilitates the lawful extraction of data from copyrighted materials for research purposes without explicit permission, and under what condition?",
          options: [
              "The DSM Directive, provided the use is strictly for non-commercial purposes",
              "The Database Directive, provided the database is publicly available",
              "The Copyright Directive, provided an exception for scientific research is applied",
              "The InfoSoc Directive, provided that reasonable remuneration is given to the copyright holder"
          ],
          answer: "The DSM Directive, provided the use is strictly for non-commercial purposes",
          points: 1.0,
          type: "3.3",
          level: "master"
      },
      {
          title: "3.3 M4",
          question: "How long does a copyright last?",
          options: [
              "10 years",
              "The creator’s lifetime plus 70 years",
              "Forever",
              "5 years after creation"
          ],
          answer: "The creator’s lifetime plus 70 years",
          points: 1.0,
          type: "3.3",
          level: "master"
      },
      {
          title: "3.3 M5",
          question: "I saw a picture online marked as 'Creative Commons.' Does that mean I can use it without violating copyright?",
          options: [
              "Yes, it’s the same thing as Public Domain",
              "Yes, as long as you use it the way the Creative Commons license says",
              "No, it’s Creative Commons doesn’t get rid of copyright, so you’re infringing",
              "Yes, as long as you pay to use the Creative Commons"
          ],
          answer: "Yes, as long as you use it the way the Creative Commons license says",
          points: 1.0,
          type: "3.3",
          level: "master"
      },
      {
          title: "3.3 M6",
          question: "I borrowed my friend’s phone and took a Snapchat of her posing with my dog. Who owns the copyright on the pic?",
          options: [
              "Your friend, since she’s the one in the picture",
              "You do, since you took the pic",
              "You do, because it’s your dog",
              "Your friend, since it’s on her phone",
              "Snapchat, since you were using their app to take the pic",
              "Your dog, because he’s obviously the star of the picture"
          ],
          answer: "You do, since you took the pic",
          points: 1.0,
          type: "3.3",
          level: "master"
      },
      {
          title: "3.4 B1",
          question: "What is an algorithm?",
          options: [
              "A set of instructions or rules",
              "A type of insect",
              "A computer game"
          ],
          answer: "A set of instructions or rules",
          points: 1.0,
          type: "3.4",
          level: "beginner"
      },
      {
          title: "3.4 B2",
          question: "Why do we need to translate an algorithm into code?",
          options: [
              "So it can be made into a story",
              "So people can read it",
              "So a computer can understand it"
          ],
          answer: "So a computer can understand it",
          points: 1.0,
          type: "3.4",
          level: "beginner"
      },
      {
          title: "3.4 B3",
          question: "Which of the following is not a characteristic of a good algorithm?",
          options: [
              "Precise",
              "Ambiguous",
              "Finite number of steps",
              "Logical flow of control"
          ],
          answer: "Ambiguous",
          points: 1.0,
          type: "3.4",
          level: "beginner"
      },
      {
          title: "3.4 B4",
          question: "Which of the following elements is essential for creating a computer program?",
          options: [
              "Only graphics",
              "A sequence of instructions designed to solve a problem",
              "Only computer hardware",
              "Only text"
          ],
          answer: "A sequence of instructions designed to solve a problem",
          points: 1.0,
          type: "3.4",
          level: "beginner"
      },
      {
          title: "3.4 B5",
          question: "What is the main function of an 'if' statement in a programming language?",
          options: [
              "To perform an action if the condition is true",
              "To only print text",
              "To create graphics",
              "To only perform mathematical operations"
          ],
          answer: "To perform an action if the condition is true",
          points: 1.0,
          type: "3.4",
          level: "beginner"
      },
      {
          title: "3.4 B6",
          question: "How can you solve a problem using a programming language?",
          options: [
              "By writing messages",
              "By creating an algorithm that describes the steps to the solution",
              "By only writing texts",
              "By only drawing diagrams"
          ],
          answer: "By creating an algorithm that describes the steps to the solution",
          points: 1.0,
          type: "3.4",
          level: "beginner"
      },
      {
          title: "3.4 M1",
          question: "Which is the algorithmic structure in proper order:",
          options: [
              "Body, Header, Declaration and Terminator",
              "Header, Body, Declaration and Terminator",
              "Header, Declaration, Body and Terminator",
              "Declaration, Body, Header and Terminator"
          ],
          answer: "Header, Declaration, Body and Terminator",
          points: 1.0,
          type: "3.4",
          level: "master"
      },
      {
          title: "3.4 M2",
          question: "How can you measure the efficiency of an algorithm?",
          options: [
              "Processor and memory",
              "Time and space",
              "Complexity and capacity",
              "Data and space"
          ],
          answer: "Time and space",
          points: 1.0,
          type: "3.4",
          level: "master"
      },
      {
          title: "3.4 M3",
          question: "Input, output, arithmetic operation and variable assignment statements are examples of which type of structure:",
          options: [
              "Loop",
              "Array",
              "Repetition",
              "Sequential",
              "Selection"
          ],
          answer: "Sequential",
          points: 1.0,
          type: "3.4",
          level: "master"
      },
      {
          title: "3.4 M4",
          question: "What is the primary principle of object-oriented programming?",
          options: [
              "Creating algorithms",
              "Writing code in only one file",
              "Organising data and functions into objects",
              "Only using text files"
          ],
          answer: "Organising data and functions into objects",
          points: 1.0,
          type: "3.4",
          level: "master"
      },
      {
          title: "3.4 M5",
          question: "How can a 'function' improve the structure of a program?",
          options: [
              "It reduces code decomposition",
              "It creates unnecessary operations",
              "It encourages code reuse",
              "It increases code complexity"
          ],
          answer: "It encourages code reuse",
          points: 1.0,
          type: "3.4",
          level: "master"
      },
      {
          title: "3.4 M6",
          question: "What is the significance of the 'debugging' process in programming?",
          options: [
              "Writing code without errors",
              "Finding and fixing errors",
              "Only organizing code",
              "Optimizing code"
          ],
          answer: "Finding and fixing errors",
          points: 1.0,
          type: "3.4",
          level: "master"
      },
      {
          title: "4.1 B1",
          question: "Which of the following is the most secure way to protect your device from malware?",
          options: [
              "Downloading apps from any website",
              "Installing antivirus software and keeping it updated",
              "Clicking on pop-up ads",
              "Ignoring software updates"
          ],
          answer: "Installing antivirus software and keeping it updated",
          points: 1.0,
          type: "4.1",
          level: "basic"
      },
      {
          title: "4.1 B2",
          question: "What is malware?",
          options: [
              "Software that automatically updates programs",
              "A virus or harmful program",
              "A firewall that protects devices",
              "A backup of personal files"
          ],
          answer: "A virus or harmful program",
          points: 1.0,
          type: "4.1",
          level: "basic"
      },
      {
          title: "4.1 B3",
          question: "What is a good practice for keeping personal data safe online?",
          options: [
              "Sharing passwords only with trusted people",
              "Using the same password for all accounts",
              "Enabling two-factor authentication",
              "Saving passwords in a text file"
          ],
          answer: "Enabling two-factor authentication",
          points: 1.0,
          type: "4.1",
          level: "basic"
      },
      {
          title: "4.1 B4",
          question: "Which of the following is a method to protect electronic devices from unauthorized access?",
          options: [
              "Disabling Wi-Fi",
              "Using a strong password",
              "Regularly deleting temporary files",
              "Closing all open applications"
          ],
          answer: "Using a strong password",
          points: 1.0,
          type: "4.1",
          level: "basic"
      },
      {
          title: "4.1 B5",
          question: "What does the presence of a padlock in a web browser's address bar indicate?",
          options: [
              "That the website is secure and protected",
              "That the site contains confidential information",
              "That the website has been verified by authorities",
              "That the website is under maintenance"
          ],
          answer: "That the website is secure and protected",
          points: 1.0,
          type: "4.1",
          level: "basic"
      },
      // {
      //     title: "4.1 B7",
      //     question: "Which of the following is a common risk when using unsecured public Wi-Fi networks?",
      //     options: [
      //         "Slower downloads",
      //         "Unauthorized access to personal data",
      //         "Network service interruptions",
      //         "Faster battery drain"
      //     ],
      //     answer: "Unauthorized access to personal data",
      //     points: 1.0,
      //     type: "4.1",
      //     level: "basic"
      // },
      {
          title: "4.1 M1",
          question: "Which of the following methods can help protect your device from unauthorized access?",
          options: [
              "Leaving it unattended in public places",
              "Using a strong, unique password or biometric security",
              "Disabling all security features",
              "Sharing your password with friends"
          ],
          answer: "Using a strong, unique password or biometric security",
          points: 1.0,
          type: "4.1",
          level: "master"
      },
      {
          title: "4.1 M2",
          question: "What is the main difference between a man-in-the-middle attack and a phishing attack?",
          options: [
              "Phishing uses malware, while man-in-the-middle does not",
              "Man-in-the-middle intercepts communications, phishing deceives the user",
              "Phishing only targets mobile devices",
              "Man-in-the-middle requires physical access to the device"
          ],
          answer: "Man-in-the-middle intercepts communications, phishing deceives the user",
          points: 1.0,
          type: "4.1",
          level: "master"
      },
      {
          title: "4.1 M3",
          question: "How does an SSL certificate protect online communications?",
          options: [
              "It encrypts the connection between the browser and the server",
              "It checks the loading speed of the website",
              "It monitors for malware on the site",
              "It verifies the identity of the users"
          ],
          answer: "It encrypts the connection between the browser and the server",
          points: 1.0,
          type: "4.1",
          level: "master"
      },
      {
          title: "4.1 M4",
          question: "What is the difference between a VPN and a firewall?",
          options: [
              "The VPN encrypts traffic, the firewall monitors and filters it",
              "The VPN blocks external attacks, the firewall encrypts communications",
              "The VPN is used only in corporate networks, the firewall is for private users",
              "The VPN prevents malware, the firewall prevents data theft"
          ],
          answer: "The VPN encrypts traffic, the firewall monitors and filters it",
          points: 1.0,
          type: "4.1",
          level: "master"
      },
      {
          title: "4.2 B1",
          question: "How can you protect your personal data when using social media?",
          options: [
              "Sharing your location in every post",
              "Using the same password for all accounts",
              "Adjusting privacy settings to limit who can see your information",
              "Accepting friend requests from everyone"
          ],
          answer: "Adjusting privacy settings to limit who can see your information",
          points: 1.0,
          type: "4.2",
          level: "basic"
      },
      {
          title: "4.2 B2",
          question: "Which of the following best describes how companies use personal data under their privacy policy?",
          options: [
              "They use the data only to sell to third-party companies",
              "They never store any personal data",
              "They collect, store, and sometimes share personal data based on the user agreement",
              "They delete personal data after one month"
          ],
          answer: "They collect, store, and sometimes share personal data based on the user agreement",
          points: 1.0,
          type: "4.2",
          level: "basic"
      },
      {
          title: "4.2 B3",
          question: "What is Personally Identifiable Information (PII)?",
          options: [
              "Any information shared on social media",
              "Information that can be used to identify an individual",
              "General data about internet usage",
              "Data stored in browser cookies"
          ],
          answer: "Information that can be used to identify an individual",
          points: 1.0,
          type: "4.2",
          level: "basic"
      },
      {
          title: "4.2 B4",
          question: "Why is it important to read a service's privacy policy?",
          options: [
              "To improve your internet speed",
              "To access hidden features of the service",
              "To receive more personalized ads",
              "To understand how your data is being collected and used"
          ],
          answer: "To understand how your data is being collected and used",
          points: 1.0,
          type: "4.2",
          level: "basic"
      },
      {
          title: "4.2 B5",
          question: "Which of the following can help protect your privacy when using digital services?",
          options: [
              "Disabling two-factor authentication",
              "Regularly clearing your browsing history",
              "Sharing personal information without verifying the source",
              "Accepting all permissions without review"
          ],
          answer: "Regularly clearing your browsing history",
          points: 1.0,
          type: "4.2",
          level: "basic"
      },
      {
          title: "4.2 B6",
          question: "What is a common privacy risk when using social media?",
          options: [
              "Receiving too many friend requests",
              "Sharing too much personal information publicly",
              "Losing old posts",
              "Following unwanted accounts"
          ],
          answer: "Sharing too much personal information publicly",
          points: 1.0,
          type: "4.2",
          level: "basic"
      },
      
      {
          title: "4.2 M1",
          question: "Which cryptographic protocol is widely used to ensure secure communication over a computer network?",
          options: [
              "HTTP",
              "FTP",
              "SSL/TLS",
              "IMAP"
          ],
          answer: "SSL/TLS",
          points: 1.0,
          type: "4.2",
          level: "master"
      },
      {
          title: "4.2 M2",
          question: "What is the main purpose of encryption when sending personal data online?",
          options: [
              "To increase internet speed",
              "To protect data from unauthorized access",
              "To enable unwanted data sharing with third parties",
              "To store data on cloud services"
          ],
          answer: "To protect data from unauthorized access",
          points: 1.0,
          type: "4.2",
          level: "master"
      },
      {
          title: "4.2 M3",
          question: "How does the General Data Protection Regulation (GDPR) impact the use of personal data by digital services?",
          options: [
              "It requires companies to get explicit consent before collecting personal data",
              "It allows companies to share user data freely without consent",
              "It only applies to financial institutions",
              "It restricts companies from using any personal data"
          ],
          answer: "It requires companies to get explicit consent before collecting personal data",
          points: 1.0,
          type: "4.2",
          level: "master"
      },
      {
          title: "4.2 M4",
          question: "What should you do if you receive an email asking for personal information but you're unsure of its legitimacy?",
          options: [
              "Reply immediately with the requested information",
              "Follow the link presented in the e-mail",
              "Verify the sender's authenticity before sharing any information",
              "Forward the email to friends"
          ],
          answer: "Verify the sender's authenticity before sharing any information",
          points: 1.0,
          type: "4.2",
          level: "master"
      },
      {
          title: "4.2 M5",
          question: "How can understanding a service's privacy policy help protect you from data misuse?",
          options: [
              "By allowing you to disable security features",
              "By informing you about how the company collects, stores, and shares your data",
              "By giving you access to all of the service's internal data",
              "By preventing you from updating your privacy settings"
          ],
          answer: "By informing you about how the company collects, stores, and shares your data",
          points: 1.0,
          type: "4.2",
          level: "master"
      },
      {
          title: "4.2 M6",
          question: "Which of the following is a common security feature used by digital services to protect personal data?",
          options: [
              "Automatically sharing user data with advertisers",
              "Two-factor authentication (2FA)",
              "Publicly displaying all user information",
              "Allowing users to use weak passwords"
          ],
          answer: "Two-factor authentication (2FA)",
          points: 1.0,
          type: "4.2",
          level: "master"
      },
      {
          title: "4.3 B1",
          question: "How can you minimize the impact of digital device usage on your health and well-being?",
          options: [
              "Using your device continuously without breaks",
              "Setting screen time limits and taking regular breaks",
              "Holding the device close to your eyes",
              "Using devices only in dark rooms"
          ],
          answer: "Setting screen time limits and taking regular breaks",
          points: 1.0,
          type: "4.3",
          level: "basic"
      },
      {
          title: "4.3 B2",
          question: "What is one of the main physical health risks when using digital devices for prolonged periods?",
          options: [
              "Increased creativity",
              "Eye strain",
              "Improved sleep quality",
              "Increased muscle strength"
          ],
          answer: "Eye strain",
          points: 1.0,
          type: "4.3",
          level: "basic"
      },
      {
          title: "4.3 B3",
          question: "Which of the following measures can help prevent cyberbullying?",
          options: [
              "Being aware of privacy settings on social media",
              "Sharing passwords with friends",
              "Turning off the internet when receiving a harmful message",
              "Ignoring all online interactions"
          ],
          answer: "Being aware of privacy settings on social media",
          points: 1.0,
          type: "4.3",
          level: "basic"
      },
      {
          title: "4.3 B4",
          question: "How can one reduce the risk of technology-related stress?",
          options: [
              "Use digital devices without taking breaks",
              "Use technology only during the day",
              "Create a digital routine that includes regular breaks and offline time",
              "Minimize the use of email"
          ],
          answer: "Create a digital routine that includes regular breaks and offline time",
          points: 1.0,
          type: "4.3",
          level: "basic"
      },
      {
          title: "4.3 B5",
          question: "Which of the following tools can help protect psychological well-being when using digital technologies?",
          options: [
              "Using blue light filters",
              "Increasing screen resolution",
              "Buying more expensive devices",
              "Turning off app notifications during rest hours"
          ],
          answer: "Turning off app notifications during rest hours",
          points: 1.0,
          type: "4.3",
          level: "basic"
      },
      {
          title: "4.3 B6",
          question: "Which of the following digital technologies is particularly effective in promoting social inclusion for people with disabilities?",
          options: [
              "Virtual reality",
              "Voice recognition software",
              "Artificial intelligence for finance",
              "Entertainment apps"
          ],
          answer: "Voice recognition software",
          points: 1.0,
          type: "4.3",
          level: "basic"
      },
      {
          title: "4.3 M1",
          question: "What is a common sign of cyberbullying that one should be aware of in digital environments?",
          options: [
              "Positive feedback on social media posts",
              "Repeated negative comments or threats",
              "Invitations to online study groups",
              "Sharing of educational resources"
          ],
          answer: "Repeated negative comments or threats",
          points: 1.0,
          type: "4.3",
          level: "master"
      },
      {
          title: "4.3 M2",
          question: "Why is awareness of privacy and security settings on social platforms important for mental health?",
          options: [
              "It ensures that only approved contacts see your information",
              "It prevents information overload",
              "It prevents identity theft",
              "It reduces anxiety caused by unwanted interactions and promotes mental peace"
          ],
          answer: "It reduces anxiety caused by unwanted interactions and promotes mental peace",
          points: 1.0,
          type: "4.3",
          level: "master"
      },
      {
          title: "4.3 M3",
          question: "Which of the following best describes how digital competence can contribute to mental and social well-being?",
          options: [
              "It enables users to browse the internet more quickly",
              "It helps individuals recognize and avoid online risks, like misinformation or harmful content",
              "It allows for constant social media interaction without emotional consequences",
              "It ensures that all online content is filtered and safe to access"
          ],
          answer: "It helps individuals recognize and avoid online risks, like misinformation or harmful content",
          points: 1.0,
          type: "4.3",
          level: "master"
      },
      {
          title: "4.3 M4",
          question: "What action can help create a safe and inclusive digital environment for others?",
          options: [
              "Sharing friends' personal information on public platforms",
              "Reporting inappropriate content or behaviors",
              "Avoiding interaction with strangers",
              "Ignoring negative messages to avoid conflict"
          ],
          answer: "Reporting inappropriate content or behaviors",
          points: 1.0,
          type: "4.3",
          level: "master"
      },
      {
          title: "4.3 M5",
          question: "What is the effect of prolonged social media use on mental health, according to several studies?",
          options: [
              "It can lead to better self-esteem",
              "It improves social skills",
              "It can increase the risk of depression and anxiety",
              "It reduces loneliness in virtual interactions"
          ],
          answer: "It can increase the risk of depression and anxiety",
          points: 1.0,
          type: "4.3",
          level: "master"
      },
      {
          title: "4.3 M6",
          question: "How can digital technologies promote social inclusion for vulnerable groups?",
          options: [
              "By allowing greater public exposure of their vulnerabilities",
              "By providing safe platforms for support and communication with others",
              "By limiting access to social networks for security reasons",
              "By allowing only professionals to interact with these groups"
          ],
          answer: "By providing safe platforms for support and communication with others",
          points: 1.0,
          type: "4.3",
          level: "master"
      },
      {
          title: "4.4 B1",
          question: "Which of the following practices helps in protecting the environment?",
          options: [
              "Disposing of electronic waste improperly",
              "Using energy-efficient devices and recycling old electronics",
              "Buying new devices frequently",
              "Ignoring software updates to save power"
          ],
          answer: "Using energy-efficient devices and recycling old electronics",
          points: 1.0,
          type: "4.4",
          level: "basic"
      },
      {
          title: "4.4 B2",
          question: "Which of the following contributes to the environmental impact of digital technologies?",
          options: [
              "Storing data on personal hard drives",
              "Using software with automatic updates",
              "Charging devices with solar power",
              "High energy consumption of data centers"
          ],
          answer: "High energy consumption of data centers",
          points: 1.0,
          type: "4.4",
          level: "basic"
      },
      {
          title: "4.4 B3",
          question: "What does the term 'digital carbon footprint' refer to?",
          options: [
              "The energy required to operate physical servers",
              "The total greenhouse gas emissions caused by digital activities",
              "The amount of data a device can store on carbon",
              "The number of digital devices a person owns"
          ],
          answer: "The total greenhouse gas emissions caused by digital activities",
          points: 1.0,
          type: "4.4",
          level: "basic"
      },
      {
          title: "4.4 B4",
          question: "Which of the following practices helps reduce e-waste?",
          options: [
              "Regularly replacing older devices",
              "Recycling or donating old electronic devices",
              "Throwing old devices in the bin",
              "Using only single-use batteries"
          ],
          answer: "Recycling or donating old electronic devices",
          points: 1.0,
          type: "4.4",
          level: "basic"
      },
      {
          title: "4.4 B5",
          question: "Which component of digital technology has the highest environmental impact?",
          options: [
              "The energy consumed by data centers",
              "The screen resolution of a smartphone",
              "The storage capacity of a hard drive",
              "The design of user interfaces"
          ],
          answer: "The energy consumed by data centers",
          points: 1.0,
          type: "4.4",
          level: "basic"
      },
      {
          title: "4.4 B6",
          question: "How can individuals reduce their digital carbon footprint?",
          options: [
              "Using multiple devices at once",
              "Turning off devices when not in use",
              "Frequently upgrading to the latest models",
              "Deleting unused apps"
          ],
          answer: "Turning off devices when not in use",
          points: 1.0,
          type: "4.4",
          level: "basic"
      },
      
      {
          title: "4.4 M1",
          question: "What practice can help minimize the environmental impact of electronic waste?",
          options: [
              "Frequently replacing electronic devices",
              "Disposing of electronics in regular trash bins",
              "Recycling old electronics properly",
              "Storing old devices in drawers"
          ],
          answer: "Recycling old electronics properly",
          points: 1.0,
          type: "4.4",
          level: "master"
      },
      {
          title: "4.4 M2",
          question: "What is the main environmental concern regarding the production of digital devices?",
          options: [
              "High energy consumption during use",
              "The extraction of rare minerals used in manufacturing",
              "The short lifespan of devices",
              "The use of recyclable packaging materials"
          ],
          answer: "The extraction of rare minerals used in manufacturing",
          points: 1.0,
          type: "4.4",
          level: "master"
      },
      {
          title: "4.4 M3",
          question: "Which of the following strategies can reduce the environmental impact of software development?",
          options: [
              "Developing more complex applications",
              "Optimizing code for energy efficiency",
              "Requiring frequent hardware upgrades",
              "Increasing the number of users"
          ],
          answer: "Optimizing code for energy efficiency",
          points: 1.0,
          type: "4.4",
          level: "master"
      },
      {
          title: "4.4 M4",
          question: "How does the production of semiconductors impact the environment?",
          options: [
              "It generates significant amounts of e-waste",
              "It requires large quantities of water and energy for manufacturing",
              "It causes increased recycling costs",
              "It reduces the demand for rare earth minerals"
          ],
          answer: "It requires large quantities of water and energy for manufacturing",
          points: 1.0,
          type: "4.4",
          level: "master"
      },
      {
          title: "4.4 M5",
          question: "Which of the following is a key factor in the environmental sustainability of digital services?",
          options: [
              "The number of users on the platform",
              "The energy efficiency of the underlying infrastructure",
              "The amount of memory in user devices",
              "The type of internet connection used"
          ],
          answer: "The energy efficiency of the underlying infrastructure",
          points: 1.0,
          type: "4.4",
          level: "master"
      },
      {
          title: "4.4 M6",
          question: "Which of the following digital practices could lead to higher environmental impact?",
          options: [
              "Using cloud storage powered by renewable energy",
              "Implementing energy-saving features in software",
              "Keeping large amounts of unused data in online servers",
              "Running data centers on energy-efficient cooling systems"
          ],
          answer: "Keeping large amounts of unused data in online servers",
          points: 1.0,
          type: "4.4",
          level: "master"
      },
      
      {
          title: "5.1 B1",
          question: "What is the first step in troubleshooting a device that won’t turn on?",
          options: [
              "Replace the battery",
              "Check the power supply",
              "Reset the device",
              "Update the software"
          ],
          answer: "Check the power supply",
          points: 1.0,
          type: "5.1",
          level: "beginner"
      },
      {
          title: "5.1 B2",
          question: "What should you do first when a device is not working as expected?",
          options: [
              "Panic and call technical support",
              "Observe the issue and take note of any error messages",
              "Restart the device without checking the issue"
          ],
          answer: "Observe the issue and take note of any error messages",
          points: 1.0,
          type: "5.1",
          level: "beginner"
      },
      {
          title: "5.1 B3",
          question: "Which of the following is a common cause of a device overheating?",
          options: [
              "Too many applications running",
              "Low battery",
              "High-speed Internet",
              "Outdated software"
          ],
          answer: "Too many applications running",
          points: 1.0,
          type: "5.1",
          level: "beginner"
      },
      {
          title: "5.1 B4",
          question: "A device that is stuck on a loading screen may require a factory reset to resolve the issue.",
          options: [
              "True",
              "False"
          ],
          answer: "True",
          points: 1.0,
          type: "5.1",
          level: "beginner"
      },
      {
          title: "5.1 B5",
          question: "When experiencing issues with software, the first step to take is to check for ______ updates, as they often contain bug fixes.",
          options: [
              "Hardware",
              "Screen",
              "Software",
              "App"
          ],
          answer: "Software",
          points: 1.0,
          type: "5.1",
          level: "beginner"
      },
      {
          title: "5.1 B6",
          question: "What tool can help diagnose network issues?",
          options: [
              "Task Manager",
              "Device Manager",
              "Command Prompt",
              "Control Panel"
          ],
          answer: "Command Prompt",
          points: 1.0,
          type: "5.1",
          level: "beginner"
      },
      {
          title: "5.1 M1",
          question: "You are unable to access a website, and other devices on the same network can. What is the most logical next step?",
          options: [
              "Restart the router",
              "Clear your browser cache",
              "Reinstall the operating system",
              "Check for malware"
          ],
          answer: "Clear your browser cache",
          points: 1.0,
          type: "5.1",
          level: "master"
      },
      {
          title: "5.1 M2",
          question: "Which of the following commands is used to test the reachability of a host on a network?",
          options: [
              "ipconfig",
              "ping",
              "tracert",
              "netstat"
          ],
          answer: "ping",
          points: 1.0,
          type: "5.1",
          level: "master"
      },
      {
          title: "5.1 M3",
          question: "When diagnosing an application that crashes randomly, which logs are the most useful?",
          options: [
              "Event Viewer (Windows) or Console Logs (Mac)",
              "Device Manager Logs",
              "Disk Activity Logs",
              "Screen Brightness Logs"
          ],
          answer: "Event Viewer (Windows) or Console Logs (Mac)",
          points: 1.0,
          type: "5.1",
          level: "master"
      },
      {
          title: "5.1 M4",
          question: "Which of the following is NOT a likely cause of a Wi-Fi connectivity issue?",
          options: [
              "Network interference from other devices",
              "Incorrect password entry",
              "Disabled Ethernet port",
              "Router firmware being outdated"
          ],
          answer: "Disabled Ethernet port",
          points: 1.0,
          type: "5.1",
          level: "master"
      },
      {
          title: "5.1 M5",
          question: "If your system displays the error 'No Bootable Device Found,' what is the most probable cause?",
          options: [
              "A disconnected hard drive",
              "A software conflict",
              "Low battery power",
              "An outdated operating system"
          ],
          answer: "A disconnected hard drive",
          points: 1.0,
          type: "5.1",
          level: "master"
      },
      {
          title: "5.1 M6",
          question: "When encountering a 'blue screen of death' (BSOD) on Windows, what is the most critical first step?",
          options: [
              "Note down the error code displayed on the screen",
              "Perform a clean reinstallation of the operating system",
              "Replace the hardware immediately"
          ],
          answer: "Note down the error code displayed on the screen",
          points: 1.0,
          type: "5.1",
          level: "master"
      },
      {
          title: "5.2 B1",
          question: "Which of the following digital tools would best support a user with limited mobility in their hands?",
          options: [
              "A traditional keyboard",
              "A touch screen",
              "Voice recognition software",
              "A mouse with high sensitivity settings"
          ],
          answer: "Voice recognition software",
          points: 1.0,
          type: "5.2",
          level: "basic"
      },
      {
          title: "5.2 B2",
          question: "Is the following sentence True or False? “Screen readers are designed to help users with limited mobility by reading aloud the contents on the screen.”",
          options: [
              "True",
              "False"
          ],
          answer: "False",
          points: 1.0,
          type: "5.2",
          level: "basic"
      },
      {
          title: "5.2 B3",
          question: "Which feature can help users with visual impairments use digital tools more effectively?",
          options: [
              "Night mode",
              "Screen reader functionality",
              "High-performance CPU"
          ],
          answer: "Screen reader functionality",
          points: 1.0,
          type: "5.2",
          level: "basic"
      },
      {
          title: "5.2 B4",
          question: "If you want to ensure your digital workspace has the correct accessibility options enabled, where should you start?",
          options: [
              "Update your operating system",
              "Check accessibility settings on your device",
              "Disable all system notifications",
              "Increase screen brightness"
          ],
          answer: "Check accessibility settings on your device",
          points: 1.0,
          type: "5.2",
          level: "basic"
      },
      {
          title: "5.2 B5",
          question: "Is the following sentence true or false? “Using dark mode on a device can reduce eye strain for some users.”",
          options: [
              "True",
              "False"
          ],
          answer: "True",
          points: 1.0,
          type: "5.2",
          level: "basic"
      },
      {
          title: "5.2 B6",
          question: "Which of the following best describes a platform that facilitates non-commercial transactions like donating or gifting?",
          options: [
              "E-commerce Website",
              "Social Media Platform",
              "Crowdfunding Site",
              "Online Marketplace"
          ],
          answer: "Crowdfunding Site",
          points: 1.0,
          type: "5.2",
          level: "basic"
      },
      {
          title: "5.2 M1",
          question: "In the context of online transactions, what is the primary function of blockchain technology in enhancing transaction security?",
          options: [
              "It centralises user data for easier access.",
              "It creates a public ledger that records all transactions immutably.",
              "It increases the speed of transactions by eliminating verification steps.",
              "It allows for unlimited data storage without costs."
          ],
          answer: "It creates a public ledger that records all transactions immutably.",
          points: 1.0,
          type: "5.2",
          level: "master"
      },
      {
          title: "5.2 M2",
          question: "What does UX customization typically focus on in advanced digital environments?",
          options: [
              "Hardware compatibility",
              "Enhancing user workflows and accessibility based on specific user preferences",
              "Reducing the number of available options in a tool"
          ],
          answer: "Enhancing user workflows and accessibility based on specific user preferences",
          points: 1.0,
          type: "5.2",
          level: "master"
      },
      {
          title: "5.2 M3",
          question: "If someone with colour blindness needs to distinguish between colours on a webpage, which adjustment would be most beneficial?",
          options: [
              "Lower the screen brightness",
              "Enable high contrast or colour correction options in accessibility settings",
              "Use a stylus to highlight text",
              "Update the browser"
          ],
          answer: "Enable high contrast or colour correction options in accessibility settings",
          points: 1.0,
          type: "5.2",
          level: "master"
      },
      {
          title: "5.2 M4",
          question: "Is the following sentence true or false? “Adaptive keyboards can be customised to support users with limited mobility, such as by enlarging key sizes or using predictive text.”",
          options: [
              "True",
              "False"
          ],
          answer: "True",
          points: 1.0,
          type: "5.2",
          level: "master"
      },
      {
          title: "5.2 M5",
          question: "Which digital tool would best support a user who struggles with reading small print on screens due to visual impairment?",
          options: [
              "Voice-to-text software",
              "A screen magnifier or zoom function",
              "High contrast mode",
              "A large-print keyboard"
          ],
          answer: "A screen magnifier or zoom function",
          points: 1.0,
          type: "5.2",
          level: "master"
      },
      {
          title: "5.2 M6",
          question: "Is the following sentence true or false? “Using high-contrast mode improves accessibility for all users, regardless of visual impairments.”",
          options: [
              "True",
              "False"
          ],
          answer: "False",
          points: 1.0,
          type: "5.2",
          level: "master"
      },
      {
          title: "5.3 B1",
          question: "Which digital tool would be most effective for brainstorming ideas collaboratively in real-time?",
          options: [
              "A word processor",
              "A spreadsheet application",
              "An online mind-mapping tool",
              "A photo editing program"
          ],
          answer: "An online mind-mapping tool",
          points: 1.0,
          type: "5.3",
          level: "basic"
      },
      {
          title: "5.3 B2",
          question: "Which IoT technology is commonly used to optimise energy consumption in smart homes?",
          options: [
              "Smart Thermostats",
              "Virtual Reality Headsets",
              "Bluetooth Speakers",
              "Fitness Trackers"
          ],
          answer: "Smart Thermostats",
          points: 1.0,
          type: "5.3",
          level: "basic"
      },
      {
          title: "5.3 B3",
          question: "Which of the following devices is an example of an IoT device?",
          options: [
              "Desktop computer",
              "Smart refrigerator",
              "Traditional alarm clock",
              "Flip phone"
          ],
          answer: "Smart refrigerator",
          points: 1.0,
          type: "5.3",
          level: "basic"
      },
      {
          title: "5.3 B4",
          question: "Which tool would be most suitable for designing a presentation?",
          options: [
              "Microsoft Excel",
              "Canva",
              "Zoom"
          ],
          answer: "Canva",
          points: 1.0,
          type: "5.3",
          level: "basic"
      },
      {
          title: "5.3 B5",
          question: "Is the following sentence true or false? “Online brainstorming tools do not allow for collaborative contributions and are only useful for individual work.”",
          options: [
              "True",
              "False"
          ],
          answer: "False",
          points: 1.0,
          type: "5.3",
          level: "basic"
      },
      {
          title: "5.3 B6",
          question: "Which of the following digital tools is most effective for prototyping and validating a new product idea quickly in a startup environment?",
          options: [
              "Word Processing Software",
              "Project Management Tools",
              "3D Printing Technology",
              "Social Media Analytics"
          ],
          answer: "3D Printing Technology",
          points: 1.0,
          type: "5.3",
          level: "basic"
      },
      {
          title: "5.3 M1",
          question: "Which of the following platforms is primarily known for providing comprehensive tools for building and managing IoT applications, including device management, data analytics, and security features?",
          options: [
              "AWS IoT Core",
              "Microsoft Word",
              "Adobe Photoshop",
              "Salesforce CRM"
          ],
          answer: "AWS IoT Core",
          points: 1.0,
          type: "5.3",
          level: "master"
      },
      {
          title: "5.3 M2",
          question: "Which of the following digital tools is most beneficial for managing and executing project plans to transform an idea into actionable steps?",
          options: [
              "Graphic Design Software",
              "Cloud-Based Project Management Tools",
              "Blogging Platforms",
              "Email Marketing Services"
          ],
          answer: "Cloud-Based Project Management Tools",
          points: 1.0,
          type: "5.3",
          level: "master"
      },
      {
          title: "5.3 M3",
          question: "For collaborative, creative problem-solving on a software project, which combination of tools is likely the most effective?",
          options: [
              "Task management tool and collaborative coding platform (like GitHub)",
              "Email and offline calendar",
              "Traditional file storage and spreadsheet software",
              "Note-taking app and social media"
          ],
          answer: "Task management tool and collaborative coding platform (like GitHub)",
          points: 1.0,
          type: "5.3",
          level: "master"
      },
      {
          title: "5.3 M4",
          question: "When designing a digital platform for community resource sharing, which of the following considerations is most crucial to ensure user trust and engagement?",
          options: [
              "High-quality graphics and interface design",
              "Robust data privacy policies and transparent user agreements",
              "Integration with social media for marketing",
              "Complicated user registration processes"
          ],
          answer: "Robust data privacy policies and transparent user agreements",
          points: 1.0,
          type: "5.3",
          level: "master"
      },
      {
          title: "5.3 M5",
          question: "Which of the following technologies can be used to prototype and test innovative product ideas?",
          options: [
              "3D modeling software like Blender",
              "Virtual reality environments",
              "AI-driven generative design tools",
              "All of the above"
          ],
          answer: "All of the above",
          points: 1.0,
          type: "5.3",
          level: "master"
      },
      {
          title: "5.3 M6",
          question: "In a collaborative problem-solving environment, which of the following practices is most effective for fostering diverse perspectives and enhancing team creativity?",
          options: [
              "Establishing a strict hierarchy in decision-making",
              "Conducting regular brainstorming sessions without evaluation",
              "Limiting participation to only subject matter experts",
              "Encouraging open dialogue and using design thinking methodologies"
          ],
          answer: "Encouraging open dialogue and using design thinking methodologies",
          points: 1.0,
          type: "5.3",
          level: "master"
      },
      {
          title: "5.4 B1",
          question: "Which of the following is a crucial first step in identifying your digital competence gaps?",
          options: [
              "Asking for feedback from others",
              "Self-assessment of current skills",
              "Taking a certification exam",
              "Focusing only on emerging technologies"
          ],
          answer: "Self-assessment of current skills",
          points: 1.0,
          type: "5.4",
          level: "basic"
      },
      {
          title: "5.4 B2",
          question: "Is the following sentence true or false? Identifying digital competence gaps is only relevant for technology-focused roles.",
          options: [
              "True",
              "False"
          ],
          answer: "False",
          points: 1.0,
          type: "5.4",
          level: "basic"
      },
      {
          title: "5.4 B3",
          question: "What is cybersecurity?",
          options: [
              "Understanding online threats and protection measures",
              "Ability to use online tools to create content",
              "Recognising credible information from digital source"
          ],
          answer: "Recognising credible information from digital source",
          points: 1.0,
          type: "5.4",
          level: "basic"
      },
      {
          title: "5.4 B4",
          question: "What is the purpose of identifying digital competence gaps?",
          options: [
              "To keep up with others' skills",
              "To stay up-to-date with evolving technologies",
              "To complete mandatory certifications",
              "To avoid using technology altogether"
          ],
          answer: "To stay up-to-date with evolving technologies",
          points: 1.0,
          type: "5.4",
          level: "basic"
      },
      {
          title: "5.4 B5",
          question: "When helping someone identify their digital competence gaps, what is the best approach?",
          options: [
              "Assume they need no assistance with basic digital skills",
              "Ask about their specific digital tasks and challenges",
              "Give them a list of digital tasks to complete alone",
              "Avoid any feedback and focus only on technical skills"
          ],
          answer: "Ask about their specific digital tasks and challenges",
          points: 1.0,
          type: "5.4",
          level: "basic"
      },
      {
          title: "5.4 B6",
          question: "Is the following sentence true or false? Once you’ve identified your digital competence gaps, the next step is to immediately start advanced training programs without considering basic skills.",
          options: [
              "True",
              "False"
          ],
          answer: "False",
          points: 1.0,
          type: "5.4",
          level: "basic"
      },
      {
          title: "5.4 M1",
          question: "Which of the following is the most effective first step in identifying your digital competence gaps?",
          options: [
              "Assume your skills are sufficient for all tasks.",
              "Use a self-assessment tool like the Digital Competence Framework (DigComp)",
              "Wait for someone to point out your weaknesses."
          ],
          answer: "Use a self-assessment tool like the Digital Competence Framework (DigComp)",
          points: 1.0,
          type: "5.4",
          level: "master"
      },
      {
          title: "5.4 M2",
          question: "What is a recommended way to stay updated with digital trends?",
          options: [
              "Regularly attend conferences, online courses, and webinars",
              "Rely solely on past experience",
              "Avoid social media and digital news",
              "Wait for employers to provide mandatory training"
          ],
          answer: "Regularly attend conferences, online courses, and webinars",
          points: 1.0,
          type: "5.4",
          level: "master"
      },
      {
          title: "5.4 M3",
          question: "Is the following sentence true or false? Supporting others with digital competence involves assessing their abilities and encouraging continual skill development.",
          options: [
              "True",
              "False"
          ],
          answer: "True",
          points: 1.0,
          type: "5.4",
          level: "master"
      },
      {
          title: "5.4 M4",
          question: "Which of the following describes an approach to monitor and improve your digital competence over time?",
          options: [
              "Only use free, basic courses",
              "Identify goals, seek feedback, and evaluate progress periodically",
              "Rely on informal knowledge from colleagues",
              "Follow the same routine tasks daily without change"
          ],
          answer: "Identify goals, seek feedback, and evaluate progress periodically",
          points: 1.0,
          type: "5.4",
          level: "master"
      },
      {
          title: "5.4 M5",
          question: "To help a colleague improve their digital competence, what should be avoided?",
          options: [
              "Offering resources for structured learning",
              "Setting clear learning objectives",
              "Allowing them to skip foundational skills",
              "Encouraging regular feedback sessions"
          ],
          answer: "Allowing them to skip foundational skills",
          points: 1.0,
          type: "5.4",
          level: "master"
      },
      {
          title: "5.4 M6",
          question: "Which of the following is not true?",
          options: [
              "Online courses provide structure for developing specific skills",
              "Digital mentor provides personalised advice and insights on strengths/weaknesses",
              "Industry news subscription keeps knowledge fresh with current updates",
              "Digital mentor keeps knowledge fresh with current updates"
          ],
          answer: "Digital mentor keeps knowledge fresh with current updates",
          points: 1.0,
          type: "5.4",
          level: "master"
      }
    ], 

    LEARNING_MATERIAL: [
        {
            text: "Learn how to articulate information needs and searching effectively in academic databases and search engines, using Boolean operators and refining search strategies to access relevant digital content.",
            links: [
                {
                    target: "Google Scholar",
                    url: "https://scholar.google.com/"
                }, 
                {
                    target: "Microsoft",
                    url: "https://support.microsoft.com/en-us/topic/advanced-search-options-b92e25f1-0085-4271-bdf9-14aaea720930"
                }
            ],

            type: "1.1",
            level: "basic"
        },
        {
            text: "Master advanced search techniques using academic and specialised databases. Explore research repositories, apply metadata filtering, and optimise searches to retrieve high-quality, peer-reviewed content.",
            links: [
                {
                    target: "Scopus",
                    url: "https://www.scopus.com/"
                }, 
                {
                    target: "JSTOR",
                    url: "https://www.jstor.org/"
                }
            ],
            type: "1.1",
            level: "master"
        },
        {
            text: "Develop critical thinking skills to assess information credibility. Learn to identify trustworthy sources, verify publication dates, check for bias, and compare methodologies to ensure accuracy in data interpretation.",
            links: [
                {
                    target: "FactCheck.org",
                    url: "https://www.factcheck.org/"
                }, 
                {
                    target: "Media Bias/Fact Check",
                    url: "https://mediabiasfactcheck.com/"
                }
            ],
            type: "1.2",
            level: "basic"
        },
        {
            text: "Apply in-depth evaluation techniques, including cross-referencing multiple sources, analysing research methods, and prioritising peer-reviewed data. Enhance research integrity by using metadata and systematic file organisation.",
            links: [
                {
                    target: "Dataset Search",
                    url: "https://datasetsearch.research.google.com/"
                }
            ],
            type: "1.2",
            level: "master"
        },
        {
            text: "Learn to organise digital files efficiently with structured folders and clear naming conventions. Use cloud storage to access data everywhere and employ data visualisation tools to improve understanding and increase your research impact.",
            links: [
                {
                    target: "Google Drive",
                    url: "https://drive.google.com/"
                }, 
                {
                    target: "Microsoft OneDrive",
                    url: "https://onedrive.live.com/"
                }
            ],
            type: "1.3",
            level: "basic"
        },
        {
            text: "Implement best practices for digital data management, including regular backups, metadata tagging, and automation for repetitive tasks. Use databases and advanced tools for seamless research organisation.",
            links: [
                {
                    target: "Zotero",
                    url: "https://www.zotero.org/"
                }, 
                {
                    target: "Mendeley",
                    url: "https://www.mendeley.com/"
                },
                {
                    target: "Harvard Biomedical Data Management",
                    url: "https://datamanagement.hms.harvard.edu/"
                },
            ],
            type: "1.3",
            level: "master"
        },
        {
            text: "Learn how to use a variety of digital technologies to interact with your peers or teachers in an institutional or private environment, and to choose the most appropriate communication tools for a given context.",
            links: [
                {
                    target: "Trello",
                    url: "https://trello.com/"
                }, 
                {
                    target: "Notion",
                    url: "https://www.notion.com/"
                }
            ],
            type: "2.1",
            level: "basic"
        },
        {
            text: "Learn how to interact with Artificial Intelligence tools, and to choose the right communication platform for diverse situations, especially for collaborative work.",
            links: [
              
            ],
            type: "2.1",
            level: "master"
        },
        {
            text: "Learn how to use digital tools and technologies to share data, information and digital content with others. By understanding sharing rules and proper attribution, you can enhance collaborative work to another level.",
            links: [
                {
                    target: "Creative Commons",
                    url: "https://creativecommons.org/"
                }, 
                {
                    target: "Dropbox",
                    url: "https://www.dropbox.com/"
                }
            ],
            type: "2.2",
            level: "basic"
        },
        {
            text: "Learn how to properly share data and information online by using the right tools and understanding copyright content and types of licenses.",
            links: [

            ],
            type: "2.2",
            level: "master"
        },
        {
            text: "Learn how to participate in society through the use of public and private digital services. Seek opportunities for self-empowerment and for participatory citizenship through appropriate digital technologies.",
            links: [
                {
                    target: "SurveyMonkey",
                    url: "https://www.surveymonkey.com/"
                }, 
                {
                    target: "Meetup",
                    url: "https://www.meetup.com/"
                }
            ],
            type: "2.3",
            level: "basic"
        },
        {
            text: "Learn how to engage as citizen in the digital world by understanding blockchain and AI technologies. Use surveys to collect different perspectives and mobilise communities on social media.",
            links: [

            ],
            type: "2.3",
            level: "master"
        },

        {
            text: "Learn how to use digital tools and technologies for collaborative work, and for co-construction and co-creation of data, resources and knowledge.",
            links: [
                {
                    target: "Mentimeter",
                    url: "https://www.mentimeter.com/"
                }, 
                {
                    target: "Slido",
                    url: "https://www.slido.com/"
                },
                {
                    target: "Canva",
                    url: "https://www.canva.com/"
                }
            ],
            type: "2.4",
            level: "basic"
        },

        {
            text: "Learn how to enhance group work through online collaboration and keep track of changes made in shared files. Improve your creativity remixing other people’s content and act as a contributor in the co-creation of knowledge.",
            links: [

            ],
            type: "2.4",
            level: "master"
        },

        {
            text: "Be aware of behavioural norms and know-how while using digital technologies to interact with others.",
            links: [

            ],
            type: "2.5",
            level: "basic"
        },

        {
            text: "Learn how to adapt communication strategies to your specific audience and to be inclusive and respectful of cultural and generational diversity in digital environments.",
            links: [

            ],
            type: "2.5",
            level: "master"
        },

        {
            text: "Learn how to create and manage multiple digital identities by protecting your own reputation and being mindful of your social media publications.",
            links: [
                {
                    target: "GDPR info",
                    url: "https://gdpr-info.eu/"
                }, 

            ],
            type: "2.6",
            level: "basic"
        },

        {
            text: "Learn how to protect your digital identities using secure authentications and knowing how to deal with the data that you produce online on different platforms, tools and services.",
            links: [

            ],
            type: "2.6",
            level: "master"
        },

        {
            "text": "Learn how to create, modify, and improve digital content by integrating different media formats, such as text, images, and audio, using a range of digital tools.",
            "links": [
                {
                    "target": "Create to Learn",
                    "url": "https://createtolearn.online/?"
                },
            ],
            "type": "3.1",
            "level": "basic"
        },
        {
            "text": "Learn how to design, develop, and optimise complex digital content, integrating multimedia, interactive elements, and data visualisation tools.",
            "links": [

            ],
            "type": "3.1",
            "level": "master"
        },

        {
            "text": "Select ways to modify, refine, improve and integrate simple information to create new content.",
            "links": [

            ],
            "type": "3.2",
            "level": "basic"
        },
        {
            "text": "Critically analyse, transform, and innovate digital content by integrating diverse multimedia formats, advanced editing techniques, and data-driven elements. Apply creative and technical skills to enhance digital materials while ensuring originality, accessibility, and ethical reuse.",
            "links": [

            ],
            "type": "3.2",
            "level": "master"
        },


        {
            "text": "Specify well-defined rules of copyright and licenses that apply to data  digital information and content. Learn how to use and share digital content legally by checking the terms and conditions and licensing schemes  such as the Creative Commons License. Know how to identify copyright limitations and exceptions.",
            "links": [],
            "type": "3.3",
            "level": "basic"
        },
        {
            "text": "Choose the most appropriate copyright and licence rules for data  digital information and content. Learn how to elaborate a suitable strategy  including content licensing  for sharing and protecting your original creations.",
            "links": [
                {
                    "target": "Creative Commons",
                    "url": "https://creativecommons.org/share-your-work/cclicenses/"
                },
            ],
            "type": "3.3",
            "level": "master"
        },

        {
            "text": "List simple instructions for a computing system to solve a given problem or perform a specific task.",
            "links": [
                {
                    "target": "Python Central",
                    "url": "https://www.pythoncentral.io/python-input-function-a-complete-guide/"
                },
                {
                    "target": "Google Colab",
                    "url": "https://colab.research.google.com/"
                },
                {
                    "target": "Replit",
                    "url": "https://replit.com/"
                }
            ],
            "type": "3.4",
            "level": "basic"
        },
        {
            "text": "Learn to develop solutions for complex problems involving multiple interacting factors by planning and creating instructions for a computing system to execute tasks efficiently.",
            "links": [
                {
                    "target": "Science Direct: Planning Algoritm",
                    "url": "https://www.sciencedirect.com/topics/computer-science/planning-algorithm#:~:text=A%20Planning%20Algorithm%20is%20a"
                },
                {
                    "target": "pandas",
                    "url": "https://pandas.pydata.org/"
                },
            ],
            "type": "3.4",
            "level": "master"
        },

        {
            "text": "Recognise and apply fundamental strategies to safeguard devices and digital content  assessing common risks and threats in online environments. Identify and implement standard security measures to ensure digital safety with routine tests and best practices. Adopt established approaches to evaluate the reliability of digital information and uphold privacy standards.",
            "links": [

                {
                    "target": "Kaspersky: Pre-emptive Safety",
                    "url": "https://www.kaspersky.com/resource-center/preemptive-safety/how-to-protect-your-devices"
                },

            ],
            "type": "4.1",
            "level": "basic"
        },
        {
            "text": "Select appropriate protections for devices and digital content  by assessing online threats. Develop solutions to complex and challenging issues related to cybersecurity by implementing safety measures  risk management  and privacy protection. Master digital security and guide others in safeguarding their devices and data.",
            "links": [],
            "type": "4.1",
            "level": "master"
        },
        {
            "text": "Identify and apply basic methods to protect personal data and privacy in digital environments  ensuring responsible sharing of personally identifiable information. Recognise and follow standard practices for securely managing and sharing personal data while minimising risks for yourself and others. Understand common privacy policy statements regarding the use of online personal data.",
            "links": [
                {
                    "target": "Complete guide to GDPR compliance",
                    "url": "https://gdpr.eu/"
                },
                {
                    "target": "EFF: Privacy",
                    "url": "https://www.eff.org/issues/privacy"
                },
                {
                    "target": "The Italian Data Protection Authority",
                    "url": "https://www.garanteprivacy.it/web/garante-privacy-en/home_en"
                }
            ],
            "type": "4.2",
            "level": "basic"
        },
        {
            "text": "Apply and evaluate appropriate methods for protecting personal data and privacy in digital environments  ensuring responsible data sharing while minimising risks for yourself and others.  Analise and assess privacy policies to understand how personal data is used and develop solutions for complex challenges related to data protection and information security. Improve your expertise by proposing innovative approaches to data security and policy development  and guide others in safeguarding digital privacy  ",
            "links": [],
            "type": "4.2",
            "level": "master"
        },
        {
            "text": "Identify and apply basic strategies to prevent health risks and protect physical and psychological well-being when using digital technologies. Choose appropriate measures to safeguard yourself and others from potential dangers in digital environments. Explore and evaluate digital technologies that promote social well-being and inclusion.",
            "links": [
                {
                    "target": "WHO: Digital Health",
                    "url": "https://www.who.int/health-topics/digital-health"
                },
            ],
            "type": "4.3",
            "level": "basic"
        },
        {
            "text": "Identify  apply  and adapt effective strategies to prevent health risks and protect physical and psychological well-being when using digital technologies. Implement and evaluate appropriate measures to safeguard yourself and others from online dangers while promoting responsible digital engagement. Develop innovative solutions to complex challenges related to digital well-being  safety  and social inclusion  contributing to advancements in this field.",
            "links": [],
            "type": "4.3",
            "level": "master"
        },
        {
            "text": "Identify the basic environmental impacts of digital technologies and their usage. Recognise and describe routine ways in which digital technologies affect the environment. Explore and discuss strategies to mitigate the environmental impact of using digital technology.",
            "links": [

            ],
            "type": "4.4",
            "level": "basic"
        },
        {
            "text": "Identify and implement effective strategies to reduce the environmental impact of digital technologies. Develop and evaluate innovative solutions to complex challenges related to sustainability in using digital technology. Contribute to sustainable practices by applying knowledge  guiding others in environmental protection  and advancing new ideas in the field.",
            "links": [],
            "type": "4.4",
            "level": "master"
        },

        {
            "text": "Learn how to identify and solve simple technical problems when operating devices and using digital environments.",
            "links": [
                {
                    "target": "Microsoft Event Viewer",
                    "url": "https://learn.microsoft.com/en-us/shows/inside/event-viewer"
                }
            ],
            "type": "5.1",
            "level": "basic"
        },
        {
            "text": "Learn how to assess technical problems when operating devices and using digital environments. Create solutions to solve complex technical problems.",
            "links": [],
            "type": "5.1",
            "level": "master"
        },
        {
            "text": "Learn to assess needs and to identify  evaluate  select and use digital tools and technological methods to solve problems. Adjust and customise digital environments to personal or institutional needs by focussing on accessibility.",
            "links": [],
            "type": "5.2",
            "level": "basic"
        },
        {
            "text": "Learn how to assess needs choosing the most appropriate digital tools and develop technological solutions to solve those needs.",
            "links": [],
            "type": "5.2",
            "level": "master"
        },
        {
            "text": "Learn how to use digital tools and technologies to create knowledge and to innovate processes and products. ",
            "links": [
                {
                    "target": "MindMeister",
                    "url": "https://www.mindmeister.com"
                },
    
            ],
            "type": "5.3",
            "level": "basic"
        },
        {
            "text": "Engage in communities and with your peers in cognitive processing to understand and solve conceptual problems in digital environments.",
            "links": [
                {
                    "target": "Trello",
                    "url": "https://trello.com/"
                },
                {
                    "target": "Blender",
                    "url": "https://www.blender.org/"
                }
            ],
            "type": "5.3",
            "level": "master"
        },
        {
            "text": "Understand where your own digital competence needs to be improved or updated. Learn how to support others in their digital competence development. ",
            "links": [],
            "type": "5.4",
            "level": "basic"
        },
        {
            "text": "Learn how to seek opportunities for self-development and to keep up-to-date with digital evolution. Apply your knowledge to contribute to your academic progress and to guide others in identifying digital competence gaps.",
            "links": [],
            "type": "5.4",
            "level": "master"
        }

    ]
    
    
}

export default env
