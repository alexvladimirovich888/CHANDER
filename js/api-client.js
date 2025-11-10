/**
 * API-клиент для работы с DexScreener и CoinGecko API
 */

// Базовые URL для API
const API_URLS = {
    dexscreener: 'https://api.dexscreener.com',
    coingecko: 'https://api.coingecko.com/api/v3'
};

/**
 * DexScreener API клиент
 */
const DexScreenerAPI = {
    /**
     * Получить последние профили токенов
     * @returns {Promise<Array>} Массив профилей токенов
     */
    getLatestProfiles: async function() {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/token-profiles/latest/v1`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching latest profiles:', error);
            throw error;
        }
    },

    /**
     * Получить последние бустнутые токены
     * @returns {Promise<Array>} Массив бустнутых токенов
     */
    getLatestBoosts: async function() {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/token-boosts/latest/v1`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching latest boosts:', error);
            throw error;
        }
    },

    /**
     * Получить топ бустнутых токенов
     * @returns {Promise<Array>} Массив топ бустнутых токенов
     */
    getTopBoosts: async function() {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/token-boosts/top/v1`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching top boosts:', error);
            throw error;
        }
    },

    /**
     * Проверить статус заказов для токена
     * @param {string} chainId - ID блокчейна
     * @param {string} tokenAddress - Адрес токена
     * @returns {Promise<Array>} Массив заказов
     */
    checkOrders: async function(chainId, tokenAddress) {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/orders/v1/${chainId}/${tokenAddress}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error checking orders:', error);
            throw error;
        }
    },

    /**
     * Получить информацию о паре токенов
     * @param {string} chainId - ID блокчейна
     * @param {string} pairAddress - Адрес пары токенов
     * @returns {Promise<Object>} Информация о паре токенов
     */
    getPairInfo: async function(chainId, pairAddress) {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/latest/dex/pairs/${chainId}/${pairAddress}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching pair info:', error);
            throw error;
        }
    },

    /**
     * Поиск пар токенов
     * @param {string} query - Поисковый запрос
     * @returns {Promise<Object>} Результаты поиска
     */
    searchPairs: async function(query) {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/latest/dex/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error searching pairs:', error);
            throw error;
        }
    },

    /**
     * Получить пулы для токена
     * @param {string} tokenAddress - Адрес токена
     * @returns {Promise<Object>} Информация о пулах
     */
    getTokenPools: async function(tokenAddress) {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/latest/dex/tokens/${tokenAddress}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching token pools:', error);
            throw error;
        }
    },
    
    /**
     * Получить детальную информацию о токене
     * @param {string} chainId - ID блокчейна
     * @param {string} tokenAddress - Адрес токена
     * @returns {Promise<Object>} Детальная информация о токене
     */
    getTokenDetails: async function(chainId, tokenAddress) {
        try {
            const response = await fetch(`${API_URLS.dexscreener}/latest/dex/tokens/${chainId}/${tokenAddress}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching token details:', error);
            throw error;
        }
    },
    
    /**
     * Получить топ монеты (фейк раздел - использует данные latest profiles)
     * @returns {Promise<Array>} Массив топ монет
     */
    getTopCoins: async function() {
        try {
            const data = await this.getLatestProfiles();
            // Перемешиваем данные для имитации топ монет
            if (Array.isArray(data)) {
                return this.shuffleArray([...data]);
            }
            return data;
        } catch (error) {
            console.error('Error fetching top coins:', error);
            throw error;
        }
    },

    /**
     * Получить трендовые монеты (фейк раздел - использует данные latest profiles)
     * @returns {Promise<Array>} Массив трендовых монет
     */
    getTrending: async function() {
        try {
            const data = await this.getLatestProfiles();
            // Перемешиваем и берем первые элементы для имитации трендов
            if (Array.isArray(data)) {
                const shuffled = this.shuffleArray([...data]);
                return shuffled.slice(0, Math.ceil(shuffled.length * 0.7));
            }
            return data;
        } catch (error) {
            console.error('Error fetching trending coins:', error);
            throw error;
        }
    },

    /**
     * Получить самые популярные монеты (фейк раздел - использует данные latest profiles)
     * @returns {Promise<Array>} Массив популярных монет
     */
    getMostLiked: async function() {
        try {
            const data = await this.getLatestProfiles();
            // Реверсируем порядок для имитации популярных монет
            if (Array.isArray(data)) {
                return [...data].reverse();
            }
            return data;
        } catch (error) {
            console.error('Error fetching most liked coins:', error);
            throw error;
        }
    },

    /**
     * Вспомогательная функция для перемешивания массива
     * @param {Array} array - Массив для перемешивания
     * @returns {Array} Перемешанный массив
     */
    shuffleArray: function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    
    /**
     * Get interesting Web3 and memecoin facts
     * @returns {Promise<Array>} Array of facts
     */
    getWeb3Facts: async function() {
        try {
            // Simulate delay for realism
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const facts = [
                {
                    id: 1,
                    category: 'Memecoins',
                    icon: '🐕',
                    title: 'Dogecoin was created as a joke in 2013',
                    content: 'Dogecoin was created by Jackson Palmer and Billy Markus as a parody of Bitcoin, inspired by the popular "Doge" meme featuring a Shiba Inu. Today it has a market cap over $15 billion.'
                },
                {
                    id: 2,
                    category: 'History',
                    icon: '🎨',
                    title: 'First crypto-cat appeared in 2014',
                    content: 'Bitcat ($BTCAT) was the first crypto-cat, recorded on the blockchain on September 28, 2014, as ASCII art in block 322,917. It paved the way for all future crypto-cats.'
                },
                {
                    id: 3,
                    category: 'Statistics',
                    icon: '📊',
                    title: 'Memecoins dominate 22.49% of crypto market',
                    content: 'In 2024, meme coins claimed the largest market share at 22.49%, surpassing major blockchains like Solana and Ethereum in terms of market attention.'
                },
                {
                    id: 4,
                    category: 'Solana',
                    icon: '⚡',
                    title: '40,000-50,000 new meme tokens created daily',
                    content: 'According to DEX aggregator reports, nearly 40,000 to 50,000 new meme tokens are created daily on Solana during normal periods, spiking to 100,000 during viral moments.'
                },
                {
                    id: 5,
                    category: 'History',
                    icon: '🖼️',
                    title: 'Rare Pepes were the second NFT series ever',
                    content: 'From 2016-2018, Rare Pepe memes on Counterparty protocol became the second NFT series in history. Some Rare Pepes have sold for over $500,000.'
                },
                {
                    id: 6,
                    category: 'Web3',
                    icon: '🌐',
                    title: 'Web3 market cap reached $2.66 trillion',
                    content: 'The cryptocurrency market rebounded strongly in 2024, with total market capitalization reaching $2.66 trillion, nearing its all-time high from 2021.'
                },
                {
                    id: 7,
                    category: 'AI',
                    icon: '🤖',
                    title: 'AI crypto tokens grew from $2.7B to $39B',
                    content: 'The market capitalization of AI-related crypto tokens skyrocketed from $2.7 billion in April 2023 to over $39 billion in 2024.'
                },
                {
                    id: 8,
                    category: 'Memecoins',
                    icon: '💎',
                    title: 'Top 10 memecoins control 90% of market',
                    content: 'In 2024, just 10 meme coins dominate 90% of the market capitalization within the meme coin niche, with Dogecoin leading at $15.21 billion.'
                },
                {
                    id: 9,
                    category: 'Statistics',
                    icon: '⏱️',
                    title: 'Average memecoin lifespan is 1.3 hours',
                    content: 'The rapid creation of meme coins is evident in their short average lifespan, with most liquid tokens only about 1.3 hours old due to high creation rate.'
                },
                {
                    id: 10,
                    category: 'Ethereum',
                    icon: '⚖️',
                    title: 'EtherRocks were originally a Reddit joke',
                    content: 'EtherRocks started as a joke on Reddit in 2017, centered around collecting 100 colorful clipart rocks. By 2021, they reached a floor price of 305 ETH ($1 million).'
                },
                {
                    id: 11,
                    category: 'DeFi',
                    icon: '🥪',
                    title: 'Food coins offered 10,000% yields in DeFi Summer',
                    content: 'During DeFi Summer 2020, "food coin" yield farms like Yam and Pickle offered astronomical returns of up to 10,000% annualized in meme coins.'
                },
                {
                    id: 12,
                    category: 'Memecoins',
                    icon: '🚀',
                    title: 'BONK helped revive Solana after FTX collapse',
                    content: '$BONK was launched to reignite interest in Solana after FTX collapse. It worked spectacularly, with over 129 integrations across DeFi, Gaming, and NFT applications.'
                },
                {
                    id: 13,
                    category: 'Gaming',
                    icon: '🎮',
                    title: '65 Web3 games migrated to Layer-2 in 2024',
                    content: 'To escape Ethereum\'s high gas fees, 65 games migrated to layer-2 networks like Polygon, Immutable, and Arbitrum in 2024, including Champions Ascension RPG.'
                },
                {
                    id: 14,
                    category: 'Statistics',
                    icon: '📈',
                    title: 'Pepe coin reached $4.6B market cap in 2025',
                    content: 'The Pepe meme coin, based on the long-standing "Pepe the Frog" meme, achieved an incredible $4.6 billion market capitalization in the first half of 2025.'
                },
                {
                    id: 15,
                    category: 'Web3',
                    icon: '🏦',
                    title: 'Tokenized assets market projected to hit $500B',
                    content: 'The tokenization of real-world assets market is projected to reach $500 billion in 2025 (excluding stablecoins), with BlackRock and JPMorgan leading the charge.'
                },
                {
                    id: 16,
                    category: 'History',
                    icon: '🎯',
                    title: 'First internet meme was born in 1993',
                    content: 'The birth of the modern internet meme in 1993 marked the last paradigm shift before blockchain memes, transforming how we express and share ideas digitally.'
                },
                {
                    id: 17,
                    category: 'Statistics',
                    icon: '🔥',
                    title: 'Pump.fun launched 5 million tokens since January',
                    content: 'Pump.fun, launched in January 2024, has enabled the creation of nearly 5 million tokens, revolutionizing memecoin deployment with no-code launches.'
                },
                {
                    id: 18,
                    category: 'Memecoins',
                    icon: '🦛',
                    title: 'MOODENG and PNUT reached billion-dollar valuations',
                    content: 'Memecoins themed around a baby hippo (MOODENG) and a slain squirrel (PNUT) rocketed to multi-billion market caps, proving anything can be tokenized.'
                },
                {
                    id: 19,
                    category: 'Web3',
                    icon: '🛰️',
                    title: 'First DePIN satellite launched in December 2024',
                    content: 'Spacecoin launched its first satellite (CTC-0) on the Creditcoin blockchain in December 2024 to provide affordable, high-speed internet to underserved regions.'
                },
                {
                    id: 20,
                    category: 'Statistics',
                    icon: '💰',
                    title: '60% of Americans expect crypto prices to rise',
                    content: 'A Security.org report shows 60% of Americans familiar with crypto expect prices to rise in 2025, with 14% of non-holders planning to invest.'
                },
                {
                    id: 21,
                    category: 'History',
                    icon: '🎭',
                    title: 'Cave paintings were the first memes',
                    content: 'The earliest humans created the first known "memes" by etching thoughts and observations onto cave walls with charcoal and chisels, traded hand-to-hand between people.'
                },
                {
                    id: 22,
                    category: 'Memecoins',
                    icon: '👑',
                    title: 'Dogecoin is among world\'s top 10 cryptocurrencies',
                    content: 'Despite starting as a joke, Dogecoin consistently ranks among the world\'s top ten cryptocurrencies by market capitalization, while Shiba Inu is in the top 15.'
                },
                {
                    id: 23,
                    category: 'Solana',
                    icon: '📱',
                    title: 'Solana averages 28,000 new tokens daily',
                    content: 'From averaging 9,000 new tokens per day in late 2023, Solana now averages more than triple that at 28,000 per day, with peaks reaching 100,000 tokens.'
                },
                {
                    id: 24,
                    category: 'Statistics',
                    icon: '⚠️',
                    title: '40% of memecoins are pump-and-dump schemes',
                    content: 'Studies show around 40% of memecoin projects involve pump-and-dump schemes, 30% are rug pulls, 20% include hidden fees, and 2-3% are honeypot scams.'
                },
                {
                    id: 25,
                    category: 'Web3',
                    icon: '🔗',
                    title: 'Ethereum was the original platform for memecoins',
                    content: 'Before Solana\'s rise, Ethereum was the primary platform for memecoins through 2020-2022, hosting iconic tokens like SHIB, PEPE, and Harry Potter Obama Sonic 10 Inu.'
                }
            ];
            
            return facts;
        } catch (error) {
            console.error('Error fetching Web3 facts:', error);
            throw error;
        }
    }
};

/**
 * CoinGecko API клиент
 */
const CoinGeckoAPI = {
    /**
     * Получить цены для нескольких монет
     * @param {Array} ids - Массив ID монет
     * @param {Array} vsCurrencies - Массив валют для конвертации
     * @param {Object} options - Дополнительные опции
     * @returns {Promise<Object>} Цены монет
     */
    getPrice: async function(ids, vsCurrencies = ['usd'], options = {}) {
        try {
            const idsParam = Array.isArray(ids) ? ids.join(',') : ids;
            const currenciesParam = Array.isArray(vsCurrencies) ? vsCurrencies.join(',') : vsCurrencies;
            
            let url = `${API_URLS.coingecko}/simple/price?ids=${encodeURIComponent(idsParam)}&vs_currencies=${encodeURIComponent(currenciesParam)}`;
            
            // Добавление опциональных параметров
            if (options.include_market_cap) url += '&include_market_cap=true';
            if (options.include_24hr_vol) url += '&include_24hr_vol=true';
            if (options.include_24hr_change) url += '&include_24hr_change=true';
            if (options.include_last_updated_at) url += '&include_last_updated_at=true';
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching prices:', error);
            throw error;
        }
    },

    /**
     * Получить цены по адресам токенов
     * @param {string} platform - ID платформы (например, ethereum, binance-smart-chain)
     * @param {Array} addresses - Массив адресов токенов
     * @param {Array} vsCurrencies - Массив валют для конвертации
     * @returns {Promise<Object>} Цены токенов
     */
    getTokenPrice: async function(platform, addresses, vsCurrencies = ['usd']) {
        try {
            const addressesParam = Array.isArray(addresses) ? addresses.join(',') : addresses;
            const currenciesParam = Array.isArray(vsCurrencies) ? vsCurrencies.join(',') : vsCurrencies;
            
            const url = `${API_URLS.coingecko}/simple/token_price/${encodeURIComponent(platform)}?contract_addresses=${encodeURIComponent(addressesParam)}&vs_currencies=${encodeURIComponent(currenciesParam)}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching token prices:', error);
            throw error;
        }
    },

    /**
     * Получить список поддерживаемых валют
     * @returns {Promise<Array>} Список валют
     */
    getSupportedCurrencies: async function() {
        try {
            const response = await fetch(`${API_URLS.coingecko}/simple/supported_vs_currencies`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching supported currencies:', error);
            throw error;
        }
    },

    /**
     * Получить список монет
     * @param {boolean} includeMarketData - Включать ли рыночные данные
     * @returns {Promise<Array>} Список монет
     */
    getCoinsList: async function(includeMarketData = false) {
        try {
            const url = includeMarketData 
                ? `${API_URLS.coingecko}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`
                : `${API_URLS.coingecko}/coins/list`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching coins list:', error);
            throw error;
        }
    },

    /**
     * Получить данные о монете по ID
     * @param {string} id - ID монеты
     * @param {Object} options - Дополнительные опции
     * @returns {Promise<Object>} Данные о монете
     */
    getCoinData: async function(id, options = {}) {
        try {
            let url = `${API_URLS.coingecko}/coins/${encodeURIComponent(id)}?localization=false`;
            
            if (options.tickers) url += '&tickers=true';
            if (options.market_data) url += '&market_data=true';
            if (options.community_data) url += '&community_data=true';
            if (options.developer_data) url += '&developer_data=true';
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching coin data:', error);
            throw error;
        }
    },

    /**
     * Получить исторические данные о монете
     * @param {string} id - ID монеты
     * @param {string} date - Дата в формате dd-mm-yyyy
     * @returns {Promise<Object>} Исторические данные
     */
    getCoinHistory: async function(id, date) {
        try {
            const url = `${API_URLS.coingecko}/coins/${encodeURIComponent(id)}/history?date=${date}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching coin history:', error);
            throw error;
        }
    },

    /**
     * Получить данные графика для монеты
     * @param {string} id - ID монеты
     * @param {string} days - Количество дней (1, 7, 14, 30, 90, 180, 365, max)
     * @param {string} currency - Валюта для конвертации
     * @returns {Promise<Object>} Данные графика
     */
    getCoinMarketChart: async function(id, days = '1', currency = 'usd') {
        try {
            const url = `${API_URLS.coingecko}/coins/${encodeURIComponent(id)}/market_chart?vs_currency=${currency}&days=${days}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching market chart:', error);
            throw error;
        }
    }
};

// Экспорт API клиентов
window.DexScreenerAPI = DexScreenerAPI;
window.CoinGeckoAPI = CoinGeckoAPI;
