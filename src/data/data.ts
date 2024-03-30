const data = [
	{
		id: 1,
		person: {
			name: 'Santi Lucky',
			username: '@Santzz12_',
			avatar:
				'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/0/a/f/3/0af3387f719ee7aebf2b96cd5fb1a9a4d7984a20.jpeg',
			verified: true, // Opcional: si el usuario está verificado
		},
		post: {
			description:
				'Chachosss, hoy empecé nuevo server con mi compa @Juanjomd_ !!!!! ÚNANSEEEEE y nos matamos unos creepers dale :D',
			timestamp: '2024-03-28T17:00:00Z', // Fecha y hora del post (en formato ISO 8601)
			likes: 20,
			comments: 6,
			hashtags: ['#Minecraft', '#Survival', '#Server'], // Lista de hashtags utilizados en el post
			mentions: ['@Juanjomd_', '@usuario2'], // Lista de usuarios mencionados en el post
			media: [
				{
					type: 'image', // Tipo de medio (image, video, etc.)
					url1: 'blob:https://web.whatsapp.com/d03e60a0-97e6-4aa0-8f37-443855e28b8d', // URL del medio
					url2: 'blob:https://web.whatsapp.com/1403cbc4-337b-4d58-a345-317c944a220d',
				},
				// Puedes agregar más objetos si hay varios medios en el post
			],
			// Puedes agregar más propiedades según sea necesario
		},
	},
	{
		id: 2,
		person: {
			name: 'NayooLover',
			username: '@Skynet8_2',
			avatar:
				'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/176427a9-0ff1-4cb0-b4a8-40359ec9ea53/dcw96pn-0a17a3eb-058c-44d0-91a3-61a2567680a8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE3NjQyN2E5LTBmZjEtNGNiMC1iNGE4LTQwMzU5ZWM5ZWE1M1wvZGN3OTZwbi0wYTE3YTNlYi0wNThjLTQ0ZDAtOTFhMy02MWEyNTY3NjgwYTgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FN3O4Hbo53ozlGUyf31AO7qcrIKomcjkMo6G4z32ef0',
			verified: false, // Opcional: si el usuario está verificado
		},
		post: {
			description:
				'Les cuento q estaba muy casual minando y me salió un enderman por atrás, me asusté mucho D: pero tengo 3 diamantes :D',
			timestamp: '2024-03-28T09:45:00Z', // Fecha y hora del post (en formato ISO 8601)
			likes: 40,
			comments: 15,
			hashtags: ['#Minecraft', '#Enderman', '#Diamantes'], // Lista de hashtags utilizados en el post
			mentions: [], // Lista de usuarios mencionados en el post
			media: [
				{
					type: 'image', // Tipo de medio (image, video, etc.)
					url1: 'https://static.wikia.nocookie.net/minecraft_es_gamepedia/images/f/f7/2011-02-21_14.46.24.png/revision/latest?cb=20110711205600', // URL del medio
					url2: 'https://staticg.sportskeeda.com/editor/2021/08/c274e-16295615679782-800.jpg',
				},
				// Puedes agregar más objetos si hay varios medios en el post
			],
			// Puedes agregar más propiedades según sea necesario
		},
	},
	{
		id: 3,
		person: {
			name: 'Mari Ruizzz',
			username: '@MarRR_24',
			avatar: 'https://pbs.twimg.com/media/FTxaVfEXsAImsYM?format=png&name=small',
			verified: false, // Opcional: si el usuario está verificado
		},
		post: {
			description:
				'¡Minecraft es lo mejor! Construí un castillo enorme hoy y derroté al dragón Ender. ¡Fue ÉPICO! 🏰🐉',
			timestamp: '2024-03-28T22:00:00Z', // Fecha y hora del post (en formato ISO 8601)
			likes: 10,
			comments: 2,
			hashtags: ['#Minecraft', '#Aventuras', '#Castillo'], // Lista de hashtags utilizados en el post
			mentions: ['@Juanjomd_', '@Skynet8_2'], // Lista de usuarios mencionados en el post
			media: [
				{
					type: 'image', // Tipo de medio (image, video, etc.)
					url1: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYT_HYKHoow2Eu0xmPI_pEZCym1RoV3eQU0upL_DjgUFyDzLt8bepbCj4n-S8ThTTDn1OgT_GhJZCAXS3yHyeo0kjLiogxWosIPJEjQCvHqCY2Qc7-JNZ5jczu1r4-UG79V6_xlrEMyJ5q/s1600/79.jpg', // URL del medio
					url2: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/10/minecraft-2511871.jpg?tf=3840x',
				},
				// Puedes agregar más objetos si hay varios medios en el post
			],
			// Puedes agregar más propiedades según sea necesario
		},
	},
	{
		id: 4,
		person: {
			name: 'Sofi Pachaa',
			username: '@Sof_Pache',
			avatar:
				'https://media.karousell.com/media/photos/products/2021/8/29/pet_commissions_updated_1630236394_c862862b_progressive.jpg',
			verified: true, // Opcional: si el usuario está verificado
		},
		post: {
			description:
				'¡Acabo de encontrar diamantes en Minecraft! ¡Estoy tan emocionado! 💎💎💎💎 ¡Hora de hacer una armadura súper genial y una espada increíble! 🛡️⚔️',
			timestamp: '2024-03-28T24:00:00Z', // Fecha y hora del post (en formato ISO 8601)
			likes: 35,
			comments: 25,
			hashtags: ['#Minecraft', '#Diamantes', '#Épico'], // Lista de hashtags utilizados en el post
			mentions: ['@Matixgr1212_', '@HowarGo1'], // Lista de usuarios mencionados en el post
			media: [
				{
					type: 'image', // Tipo de medio (image, video, etc.)
					url1: 'https://i.blogs.es/eb2c51/diamante-minecraft/1366_2000.jpeg', // URL del medio
					url2: 'https://i.ytimg.com/vi/Xcl08z4vinA/maxresdefault.jpg',
				},
				// Puedes agregar más objetos si hay varios medios en el post
			],
			// Puedes agregar más propiedades según sea necesario
		},
	},
	{
		id: 5,
		person: {
			name: 'El Matiassx',
			username: '@Matixgr1212_',
			avatar: 'https://i.pinimg.com/564x/06/1b/82/061b82351616561cddb942c7b64a6bd3.jpg',
			verified: false, // Opcional: si el usuario está verificado
		},
		post: {
			description:
				'¡Qué día tan genial en Minecraft! Construí una granja automática de caña de azúcar y ahora tengo un montón de azúcar para mis pociones. ¡Minecraft es asombroso!',
			timestamp: '2024-03-28T15:41:00Z', // Fecha y hora del post (en formato ISO 8601)
			likes: 50,
			comments: 15,
			hashtags: ['#Minecraft', '#Granja', '#Pociones'], // Lista de hashtags utilizados en el post
			mentions: ['@Santzz12_', '@HowarGo1'], // Lista de usuarios mencionados en el post
			media: [
				{
					type: 'image', // Tipo de medio (image, video, etc.)
					url1: 'https://i.pinimg.com/originals/a5/ab/19/a5ab1945f5a2638ddfe705e934e76ac7.jpg', // URL del medio
					url2: 'https://pm1.aminoapps.com/6310/6a4b3162478cc2e8f4d1f347a882ceca9df63fd3_hq.jpg',
				},
				// Puedes agregar más objetos si hay varios medios en el post
			],
			// Puedes agregar más propiedades según sea necesario
		},
		friends: [
			{
				id: 1,
				name: 'Santi Lucky',
				username: '@Santzz12_',
				avatar:
					'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/0/a/f/3/0af3387f719ee7aebf2b96cd5fb1a9a4d7984a20.jpeg',
				verified: true,
			},
			{
				id: 2,
				name: 'NayooLover',
				username: '@Skynet8_2',
				avatar:
					'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/176427a9-0ff1-4cb0-b4a8-40359ec9ea53/dcw96pn-0a17a3eb-058c-44d0-91a3-61a2567680a8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE3NjQyN2E5LTBmZjEtNGNiMC1iNGE4LTQwMzU5ZWM5ZWE1M1wvZGN3OTZwbi0wYTE3YTNlYi0wNThjLTQ0ZDAtOTFhMy02MWEyNTY3NjgwYTgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FN3O4Hbo53ozlGUyf31AO7qcrIKomcjkMo6G4z32ef0',
				verified: false,
			},
			{
				id: 3,
				name: 'Mari Ruizzz',
				username: '@MarRR_24',
				avatar: 'https://pbs.twimg.com/media/FTxaVfEXsAImsYM?format=png&name=small',
				verified: false,
			},
			{
				id: 4,
				name: 'Sofi Pachaa',
				username: '@Sof_Pache',
				avatar:
					'https://media.karousell.com/media/photos/products/2021/8/29/pet_commissions_updated_1630236394_c862862b_progressive.jpg',
				verified: true,
			},
			{
				id: 6,
				name: 'Gomecito H',
				username: '@HowarGo1',
				avatar: 'https://i.pinimg.com/736x/eb/d6/64/ebd664d8ec2f4458ffd55681292a578d.jpg',
				verified: true,
			},
		],
	},
];
