(() => {
	'use strict';
	var t = {
			227: (t, e, n) => {
				n.d(e, { A: () => r });
				var a = n(601),
					s = n.n(a),
					i = n(314),
					o = n.n(i)()(s());
				o.push([t.id, '', '']);
				const r = o;
			},
			111: (t, e, n) => {
				n.d(e, { A: () => r });
				var a = n(601),
					s = n.n(a),
					i = n(314),
					o = n.n(i)()(s());
				o.push([t.id, '', '']);
				const r = o;
			},
			377: (t, e, n) => {
				n.d(e, { A: () => r });
				var a = n(601),
					s = n.n(a),
					i = n(314),
					o = n.n(i)()(s());
				o.push([t.id, '', '']);
				const r = o;
			},
			561: (t, e, n) => {
				n.d(e, { A: () => r });
				var a = n(601),
					s = n.n(a),
					i = n(314),
					o = n.n(i)()(s());
				o.push([t.id, '', '']);
				const r = o;
			},
			721: (t, e, n) => {
				n.d(e, { A: () => r });
				var a = n(601),
					s = n.n(a),
					i = n(314),
					o = n.n(i)()(s());
				o.push([t.id, '', '']);
				const r = o;
			},
			969: (t, e, n) => {
				n.d(e, { A: () => r });
				var a = n(601),
					s = n.n(a),
					i = n(314),
					o = n.n(i)()(s());
				o.push([t.id, '', '']);
				const r = o;
			},
			711: (t, e, n) => {
				n.d(e, { A: () => r });
				var a = n(601),
					s = n.n(a),
					i = n(314),
					o = n.n(i)()(s());
				o.push([t.id, '', '']);
				const r = o;
			},
			523: (t, e, n) => {
				n.d(e, { A: () => r });
				var a = n(601),
					s = n.n(a),
					i = n(314),
					o = n.n(i)()(s());
				o.push([t.id, '', '']);
				const r = o;
			},
			314: (t) => {
				t.exports = function (t) {
					var e = [];
					return (
						(e.toString = function () {
							return this.map(function (e) {
								var n = '',
									a = void 0 !== e[5];
								return (
									e[4] && (n += '@supports ('.concat(e[4], ') {')),
									e[2] && (n += '@media '.concat(e[2], ' {')),
									a && (n += '@layer'.concat(e[5].length > 0 ? ' '.concat(e[5]) : '', ' {')),
									(n += t(e)),
									a && (n += '}'),
									e[2] && (n += '}'),
									e[4] && (n += '}'),
									n
								);
							}).join('');
						}),
						(e.i = function (t, n, a, s, i) {
							'string' == typeof t && (t = [[null, t, void 0]]);
							var o = {};
							if (a)
								for (var r = 0; r < this.length; r++) {
									var c = this[r][0];
									null != c && (o[c] = !0);
								}
							for (var d = 0; d < t.length; d++) {
								var m = [].concat(t[d]);
								(a && o[m[0]]) ||
									(void 0 !== i &&
										(void 0 === m[5] ||
											(m[1] = '@layer'.concat(m[5].length > 0 ? ' '.concat(m[5]) : '', ' {').concat(m[1], '}')),
										(m[5] = i)),
									n && (m[2] ? ((m[1] = '@media '.concat(m[2], ' {').concat(m[1], '}')), (m[2] = n)) : (m[2] = n)),
									s &&
										(m[4]
											? ((m[1] = '@supports ('.concat(m[4], ') {').concat(m[1], '}')), (m[4] = s))
											: (m[4] = ''.concat(s))),
									e.push(m));
							}
						}),
						e
					);
				};
			},
			601: (t) => {
				t.exports = function (t) {
					return t[1];
				};
			},
		},
		e = {};
	function n(a) {
		var s = e[a];
		if (void 0 !== s) return s.exports;
		var i = (e[a] = { id: a, exports: {} });
		return t[a](i, i.exports, n), i.exports;
	}
	(n.n = (t) => {
		var e = t && t.__esModule ? () => t.default : () => t;
		return n.d(e, { a: e }), e;
	}),
		(n.d = (t, e) => {
			for (var a in e) n.o(e, a) && !n.o(t, a) && Object.defineProperty(t, a, { enumerable: !0, get: e[a] });
		}),
		(n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
		(() => {
			var t,
				e = n(523),
				a = n(969);
			!(function (t) {
				(t.avatar = 'avatar'),
					(t.name = 'name'),
					(t.username = 'username'),
					(t.description = 'description'),
					(t.timestamp = 'timestamp'),
					(t.hashtags = 'hashtags'),
					(t.media = 'media'),
					(t.likes = 'likes'),
					(t.comments = 'comments'),
					(t.images = 'images'),
					(t.tags = 'tags');
			})(t || (t = {}));
			class s extends HTMLElement {
				static get observedAttributes() {
					return Object.keys({
						avatar: null,
						name: null,
						username: null,
						description: null,
						timestamp: null,
						hashtags: null,
						media: null,
						likes: null,
						comments: null,
						images: null,
						tags: null,
					});
				}
				constructor() {
					super(), (this.images = ''), (this.tags = ''), this.attachShadow({ mode: 'open' });
				}
				connectedCallback() {
					this.render();
				}
				attributeChangedCallback(e, n, a) {
					switch ((console.log('Attribute changed:', e, 'Old value:', n, 'New value:', a), e)) {
						case t.likes:
							this.likes = a ? Number(a) : void 0;
							break;
						case t.comments:
							this.comments = a ? Number(a) : void 0;
							break;
						case t.hashtags:
							a ? ((this.hashtags = JSON.parse(a)), this.createHashtags()) : (this.hashtags = void 0);
							break;
						case t.media:
							a ? ((this.media = JSON.parse(a)), this.createImages()) : (this.media = void 0);
							break;
						default:
							this[e] = a;
					}
					this.render();
				}
				createHashtags() {
					var t;
					null === (t = this.hashtags) ||
						void 0 === t ||
						t.forEach((t) => {
							this.tags = this.tags + `<span>${t}</span>`;
						});
				}
				createImages() {
					var t;
					null === (t = this.media) ||
						void 0 === t ||
						t.forEach((t) => {
							this.images = this.images + `<img src='${t}'></img>`;
						});
				}
				render() {
					var t, e;
					console.log('likes', this.likes),
						console.log('comments', this.comments),
						this.shadowRoot &&
							(this.shadowRoot.innerHTML = `\n        <figure>\n            <div class="container-info">\n                <div class="frame">\n                    <img src="${
								this.avatar
							}"></img>\n                </div>\n                <div class="user-info">\n                    <span>${
								this.name
							}</span>\n                    <span>${this.username}</span>\n                    <span>${
								this.timestamp
							}</span>\n                </div>\n                <p>${
								this.description
							}</p>\n                <div class="hashtag-post">${
								this.tags
							}</div>\n                <div class="image-post">\n                    ${
								this.images
							}\n                </div>\n                <button-interactions digitButton="${
								void 0 !== this.likes ? this.likes : 'undefined'
							}"></button-interactions>\n                <button-interactions digitButton="${
								void 0 !== this.comments ? this.comments : 'undefined'
							}"></button-interactions>\n            </div>\n        </figure>\n    `);
					const n = null === (t = this.shadowRoot) || void 0 === t ? void 0 : t.querySelectorAll('button-interactions');
					null == n ||
						n.forEach((t, e) => {
							const n = 0 === e ? this.likes : this.comments;
							void 0 !== n && t.setAttribute('digitButton', String(n));
						});
					const s = this.ownerDocument.createElement('style');
					(s.innerHTML = a.A), null === (e = this.shadowRoot) || void 0 === e || e.appendChild(s);
				}
			}
			customElements.define('single-card-post', s);
			var i = n(377);
			const o = [
					{
						id: 1,
						person: {
							name: 'Santi Lucky',
							username: '@Santzz12_',
							avatar:
								'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/0/a/f/3/0af3387f719ee7aebf2b96cd5fb1a9a4d7984a20.jpeg',
							verified: !0,
						},
						post: {
							description:
								'Chachosss, hoy empecé nuevo server con mi compa @Juanjomd_ !!!!! ÚNANSEEEEE y nos matamos unos creepers dale :D',
							timestamp: '2024-03-28T17:00:00Z',
							likes: 20,
							comments: 6,
							hashtags: ['#Minecraft', '#Survival', '#Server'],
							media: [
								'https://i.pinimg.com/originals/84/55/4f/84554f3beca4a14d020917ab36638159.jpg',
								'https://i.pinimg.com/564x/5c/75/78/5c757889ad1d8e0f9b9aadbe96dd26e4.jpg',
							],
						},
					},
					{
						id: 2,
						person: {
							name: 'NayooLover',
							username: '@Skynet8_2',
							avatar:
								'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/176427a9-0ff1-4cb0-b4a8-40359ec9ea53/dcw96pn-0a17a3eb-058c-44d0-91a3-61a2567680a8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE3NjQyN2E5LTBmZjEtNGNiMC1iNGE4LTQwMzU5ZWM5ZWE1M1wvZGN3OTZwbi0wYTE3YTNlYi0wNThjLTQ0ZDAtOTFhMy02MWEyNTY3NjgwYTgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FN3O4Hbo53ozlGUyf31AO7qcrIKomcjkMo6G4z32ef0',
							verified: !1,
						},
						post: {
							description:
								'Les cuento q estaba muy casual minando y me salió un enderman por atrás, me asusté mucho D: pero tengo 3 diamantes :D',
							timestamp: '2024-03-28T09:45:00Z',
							likes: 40,
							comments: 15,
							hashtags: ['#Minecraft', '#Enderman', '#Diamantes'],
							media: [
								'https://www.magisnet.com/wp-content/uploads/2020/05/Minecraft3.jpg',
								'https://staticg.sportskeeda.com/editor/2021/08/c274e-16295615679782-800.jpg',
							],
						},
					},
					{
						id: 3,
						person: {
							name: 'Mari Ruizzz',
							username: '@MarRR_24',
							avatar: 'https://pbs.twimg.com/media/FTxaVfEXsAImsYM?format=png&name=small',
							verified: !1,
						},
						post: {
							description:
								'¡Minecraft es lo mejor! Construí un castillo enorme hoy y derroté al dragón Ender. ¡Fue ÉPICO! 🏰🐉',
							timestamp: '2024-03-28T22:00:00Z',
							likes: 10,
							comments: 2,
							hashtags: ['#Minecraft', '#Aventuras', '#Castillo'],
							media: [
								'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYT_HYKHoow2Eu0xmPI_pEZCym1RoV3eQU0upL_DjgUFyDzLt8bepbCj4n-S8ThTTDn1OgT_GhJZCAXS3yHyeo0kjLiogxWosIPJEjQCvHqCY2Qc7-JNZ5jczu1r4-UG79V6_xlrEMyJ5q/s1600/79.jpg',
								'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/10/minecraft-2511871.jpg?tf=3840x',
							],
						},
					},
					{
						id: 4,
						person: {
							name: 'Sofi Pachaa',
							username: '@Sof_Pache',
							avatar:
								'https://media.karousell.com/media/photos/products/2021/8/29/pet_commissions_updated_1630236394_c862862b_progressive.jpg',
							verified: !0,
						},
						post: {
							description:
								'¡Acabo de encontrar diamantes en Minecraft! ¡Estoy tan emocionado! 💎💎💎💎 ¡Hora de hacer una armadura súper genial y una espada increíble! 🛡️⚔️',
							timestamp: '2024-03-28T24:00:00Z',
							likes: 35,
							comments: 25,
							hashtags: ['#Minecraft', '#Diamantes', '#Épico'],
							media: [
								'https://i.blogs.es/eb2c51/diamante-minecraft/1366_2000.jpeg',
								'https://i.ytimg.com/vi/Xcl08z4vinA/maxresdefault.jpg',
							],
						},
					},
					{
						id: 5,
						person: {
							name: 'El Matiassx',
							username: '@Matixgr1212_',
							avatar: 'https://i.pinimg.com/564x/06/1b/82/061b82351616561cddb942c7b64a6bd3.jpg',
							verified: !1,
						},
						post: {
							description:
								'¡Qué día tan genial en Minecraft! Construí una granja automática de caña de azúcar y ahora tengo un montón de azúcar para mis pociones. ¡Minecraft es asombroso!',
							timestamp: '2024-03-28T15:41:00Z',
							likes: 50,
							comments: 15,
							hashtags: ['#Minecraft', '#Granja', '#Pociones'],
							media: [
								'https://i.pinimg.com/originals/a5/ab/19/a5ab1945f5a2638ddfe705e934e76ac7.jpg',
								'https://pm1.aminoapps.com/6310/6a4b3162478cc2e8f4d1f347a882ceca9df63fd3_hq.jpg',
							],
						},
					},
				],
				r = [
					{
						id: 1,
						name: 'Santi Lucky',
						username: '@Santzz12_',
						avatar:
							'https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/5X/0/a/f/3/0af3387f719ee7aebf2b96cd5fb1a9a4d7984a20.jpeg',
					},
					{
						id: 2,
						name: 'NayooLover',
						username: '@Skynet8_2',
						avatar:
							'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/176427a9-0ff1-4cb0-b4a8-40359ec9ea53/dcw96pn-0a17a3eb-058c-44d0-91a3-61a2567680a8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE3NjQyN2E5LTBmZjEtNGNiMC1iNGE4LTQwMzU5ZWM5ZWE1M1wvZGN3OTZwbi0wYTE3YTNlYi0wNThjLTQ0ZDAtOTFhMy02MWEyNTY3NjgwYTgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FN3O4Hbo53ozlGUyf31AO7qcrIKomcjkMo6G4z32ef0',
					},
					{
						id: 3,
						name: 'Mari Ruizzz',
						username: '@MarRR_24',
						avatar: 'https://pbs.twimg.com/media/FTxaVfEXsAImsYM?format=png&name=small',
					},
					{
						id: 4,
						name: 'Sofi Pachaa',
						username: '@Sof_Pache',
						avatar:
							'https://media.karousell.com/media/photos/products/2021/8/29/pet_commissions_updated_1630236394_c862862b_progressive.jpg',
					},
					{
						id: 6,
						name: 'Gomecito H',
						username: '@HowarGo1',
						avatar: 'https://i.pinimg.com/736x/eb/d6/64/ebd664d8ec2f4458ffd55681292a578d.jpg',
					},
				];
			class c extends HTMLElement {
				constructor() {
					super(), (this.cards = []), this.attachShadow({ mode: 'open' }), this.getValueData();
				}
				connectedCallback() {
					this.render();
				}
				getValueData() {
					o.forEach((e) => {
						const n = this.ownerDocument.createElement('single-card-post');
						n.setAttribute(t.avatar, e.person.avatar),
							n.setAttribute(t.name, e.person.name),
							n.setAttribute(t.username, e.person.username),
							n.setAttribute(t.description, e.post.description),
							n.setAttribute(t.timestamp, e.post.timestamp),
							n.setAttribute(t.hashtags, JSON.stringify(e.post.hashtags)),
							n.setAttribute(t.media, JSON.stringify(e.post.media)),
							n.setAttribute(t.likes, e.post.likes),
							n.setAttribute(t.comments, e.post.comments),
							console.log('Likes:', e.post.likes),
							console.log('Comments:', e.post.comments),
							this.cards.push(n);
					});
				}
				render() {
					var t, e;
					if (this.shadowRoot) {
						const e = this.ownerDocument.createElement('section');
						this.cards.forEach((t) => {
							e.appendChild(t);
						}),
							null === (t = this.shadowRoot) || void 0 === t || t.appendChild(e);
					}
					const n = this.ownerDocument.createElement('style');
					(n.innerHTML = i.A), null === (e = this.shadowRoot) || void 0 === e || e.appendChild(n);
				}
			}
			customElements.define('cards-container', c);
			var d,
				m = n(711);
			!(function (t) {
				(t.avatar = 'avatar'), (t.name = 'name'), (t.username = 'username');
			})(d || (d = {}));
			class l extends HTMLElement {
				static get observedAttributes() {
					return Object.keys({ avatar: null, name: null, username: null });
				}
				constructor() {
					super(), this.attachShadow({ mode: 'open' });
				}
				connectedCallback() {
					this.render();
				}
				attributeChangedCallback(t, e, n) {
					(this[t] = n), this.render();
				}
				render() {
					var t;
					this.shadowRoot &&
						(this.shadowRoot.innerHTML = `\n          <div class = "friend-container">\n            <div class = "frame">\n            <img src = "${this.avatar}"></img>\n            </div>\n            <div class = "info-friend">\n              <span>${this.name}</span>\n              <span>${this.username}</span>\n            </div>\n          </div>\n      `);
					const e = this.ownerDocument.createElement('style');
					(e.innerHTML = m.A), null === (t = this.shadowRoot) || void 0 === t || t.appendChild(e);
				}
			}
			customElements.define('user-friends', l);
			var h = n(561);
			class u extends HTMLElement {
				constructor() {
					super(), (this.users = []), this.attachShadow({ mode: 'open' }), this.getValueData();
				}
				connectedCallback() {
					this.render();
				}
				getValueData() {
					r.forEach((t) => {
						const e = this.ownerDocument.createElement('user-friends');
						e.setAttribute(d.avatar, t.avatar),
							e.setAttribute(d.name, t.name),
							e.setAttribute(d.username, t.username),
							this.users.push(e);
					});
				}
				render() {
					var t, e, n;
					if (this.shadowRoot) {
						const n = this.ownerDocument.createElement('div'),
							a = this.ownerDocument.createElement('h3');
						a.textContent = 'Friends';
						const s = this.ownerDocument.createElement('i');
						(s.className = 'fa-solid fa-magnifying-glass'),
							n.appendChild(a),
							n.appendChild(s),
							null === (t = this.shadowRoot) || void 0 === t || t.appendChild(n);
						const i = this.ownerDocument.createElement('section');
						this.users.forEach((t) => {
							i.appendChild(t);
						}),
							null === (e = this.shadowRoot) || void 0 === e || e.appendChild(i);
					}
					const a = this.ownerDocument.createElement('style');
					(a.innerHTML = h.A), null === (n = this.shadowRoot) || void 0 === n || n.appendChild(a);
				}
			}
			customElements.define('container-friends', u);
			var p = n(721);
			class g extends HTMLElement {
				constructor() {
					super(), this.attachShadow({ mode: 'open' });
				}
				connectedCallback() {
					this.render();
				}
				render() {
					var t;
					this.shadowRoot &&
						(this.shadowRoot.innerHTML =
							'\n\t\t\t<button-nav iconGeneral = "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"></button-nav>\n\t\t\t<button-nav iconGeneral = "https://cdn.pixabay.com/photo/2018/11/13/21/44/instagram-3814061_1280.png"></button-nav>\n\t\t\t<button-nav iconGeneral = "https://cdn-icons-png.flaticon.com/512/25/25694.png"></button-nav>\n\t\t\t<button-nav iconGeneral = "https://static.vecteezy.com/system/resources/previews/005/337/802/non_2x/icon-symbol-chat-outline-illustration-free-vector.jpg"></button-nav>\n\t\t\t<button-nav iconGeneral = "https://static-00.iconduck.com/assets.00/settings-icon-1964x2048-8nigtrtt.png"></button-nav>\n\t\t\t');
					const e = this.ownerDocument.createElement('style');
					(e.innerHTML = p.A), null === (t = this.shadowRoot) || void 0 === t || t.appendChild(e);
				}
			}
			customElements.define('nav-bar', g);
			var v,
				b = n(227);
			!(function (t) {
				t.iconGeneral = 'iconGeneral';
			})(v || (v = {}));
			class f extends HTMLElement {
				static get observedAttributes() {
					return Object.keys({ iconGeneral: null });
				}
				constructor() {
					super(), this.attachShadow({ mode: 'open' });
				}
				connectedCallback() {
					this.render();
				}
				attributeChangedCallback(t, e, n) {
					(this[t] = n), this.render();
				}
				render() {
					var t;
					this.shadowRoot &&
						(this.shadowRoot.innerHTML = `\n          <button><icon-component iconImage = "${this.iconGeneral}"></icon-component></button>\n      `);
					const e = this.ownerDocument.createElement('style');
					(e.innerHTML = b.A), null === (t = this.shadowRoot) || void 0 === t || t.appendChild(e);
				}
			}
			customElements.define('button-nav', f);
			var w,
				M,
				y = n(111);
			!(function (t) {
				(t.iconImage = 'iconImage'), (t.digitButton = 'digitButton');
			})(w || (w = {}));
			class E extends HTMLElement {
				static get observedAttributes() {
					return Object.keys({ iconImage: null, digitButton: null });
				}
				constructor() {
					super(), this.attachShadow({ mode: 'open' });
				}
				connectedCallback() {
					this.render();
				}
				attributeChangedCallback(t, e, n) {
					t === w.digitButton ? (this.digitButton = n ? Number(n) : void 0) : (this[t] = n), this.render();
				}
				render() {
					var t;
					this.shadowRoot &&
						(this.shadowRoot.innerHTML = `\n          <div class = "button-comment">\n            <button><img src = "${this.iconImage}"></img></button>\n            <span>${this.digitButton}</span>\n          </div>\n    `);
					const e = this.ownerDocument.createElement('style');
					(e.innerHTML = y.A), null === (t = this.shadowRoot) || void 0 === t || t.appendChild(e);
				}
			}
			customElements.define('button-interactions', E),
				(function (t) {
					(t.iconImage = 'iconImage'), (t.size = 'size'), (t.color = 'color');
				})(M || (M = {}));
			class T extends HTMLElement {
				static get observedAttributes() {
					return Object.keys({ iconImage: null, size: null, color: null });
				}
				constructor() {
					super(), (this.size = '24'), (this.color = 'black'), this.attachShadow({ mode: 'open' });
				}
				connectedCallback() {
					this.render();
				}
				attributeChangedCallback(t, e, n) {
					(this[t] = n), this.render();
				}
				render() {
					this.shadowRoot && (this.shadowRoot.innerHTML = `\n      <img src = "${this.iconImage}"></img>\n      `);
				}
			}
			customElements.define('icon-component', T);
			class k extends HTMLElement {
				constructor() {
					super(), this.attachShadow({ mode: 'open' });
				}
				connectedCallback() {
					this.render();
				}
				render() {
					var t;
					this.shadowRoot &&
						(this.shadowRoot.innerHTML =
							'\n      <div class = "logo-container">\n        <h1>HandKid</h1>\n      </div>\n      <nav-bar></nav-bar>\n      <cards-container></cards-container>\n      <container-friends></container-friends>\n      ');
					const n = this.ownerDocument.createElement('style');
					(n.innerHTML = e.A), null === (t = this.shadowRoot) || void 0 === t || t.appendChild(n);
				}
			}
			customElements.define('app-container', k);
		})();
})();
