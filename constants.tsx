
import { Product, Category } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Elite Performance Pro Runners - Хөнгөн, амьсгалдаг',
    price: 45000,
    originalPrice: 310000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-PMrKLOOJZU8ifeBTS_rsxeB_nh8CplQ0KDgoZ2Qow0fj0K35-bYQr7sl1aeP6I8JXcx82XZzagRlwdCu0wtsPoypmti0rteUXeqJk5lpTF01UUE0_SSNycAsJHG1alNsS52sOt-V9Cddf6maxaLv-uyDFyilZeacFgbn6s2Ihe358mPHPQZjAPxPGvFQibeL_xGdg-YSj1Z0eytscis5Dh20GNhz3h3pcB0Epk9tmbsA_iA5xdSHdG7GE-Lu9CTAt2nPjpRnsx-L',
    category: 'shoes',
    tag: '85% ХЯМДРАЛ',
    soldCount: '1.2к+'
  },
  {
    id: '2',
    name: 'Шуугиан тусгаарлагчтай утасгүй чихэвч',
    price: 68000,
    originalPrice: 175000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXPh38hIpU7EO9AtYmX-_EzO7ODesHzOf9I46I13awKN9CVwgPGfBG_tjy0HKfOhKfNHtW-FsT42ksmG0m-OU2R-yubY3DP-rTLXoh7h-8xtsLej56CL4dTLfXFmHfrsV1LW4KdyoEAqT3yun4mrzvLmfghIY-mw61EVhqSXr-8HDpZip0UctoSHsBjzHRq0uXZ18frI01oh4Y7QayXIlMTPfwi5-GEQ1pL2aJM2Bk6fOvyHojl83n7DuWs9_EEafgXVMZDZtqSZ0e',
    category: 'electronics',
    tag: 'ХЭМНЭЛТ 100к',
    soldCount: '3.5к+'
  },
  {
    id: '3',
    name: 'Минималист загварын Classic бугуйн цаг',
    price: 29500,
    originalPrice: 87000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhfs7ADD1_kK15bEP_74VwScXR_FG95GUAzOBoTI26yTvWgzI-4eqfeudLc7yO_c9fbbukObQQoDRQQajiKC79YzhcDkBvc_1rq3oGJZyXymSlCbKXNpzaRoS2LqMAaXMSqhTABUgqIKRCXxSn-wNrjRQK__lJG1TLpa6-7jjrfyjzhsmvWsnJW7ooY14XzMjSiw22UA6lEvYx5P2_XO9rvCDn7VWvEfAsMSEjo6wYwJT1lQganY7_j-IK5wR92XboXuAow0Jb82vb',
    category: 'accessories',
    tag: 'ШИНЭ',
    soldCount: '500+'
  },
  {
    id: '4',
    name: 'GamerPro Surround Sound Headset',
    price: 53200,
    originalPrice: 122000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZR8IhdYGoV5gKjVjkEYyHcQj3qWBY2xpmkWZ6TC33eTX0LJvS9tf9vmOxHQPUr3k-vByl0pEjnNJqQmCQm-nkyT7k7Y5aavtz3uVJQevjP53WaTj5YnM2YjThe6ZdSxM3AWGFNnD16e-kvgqyJl80XFnXq2B78cDayEj5cyZrJyE3TkQmXDV3aAy0JFuSxP2agDQnutjIaoMkGKWtBs7ewcWeKioU4T2kbgo9OfEwYwiAMqpHeE4J_f0GiKHTN-YP5jwmZ6JgDVL6',
    category: 'electronics',
    tag: 'ОНЦЛОХ',
    soldCount: '800+'
  },
  {
    id: '5',
    name: 'RGB Гэрэлтэй механик гар - Тоглоомын',
    price: 89000,
    originalPrice: 145000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-vRo-cymUUgBSYaIygWoF8mOAZ4oyPNxHBEBFQrlubLvpp6EBg8etcgfFaS5RDTIGO2uhga5A9Pq4Q6RZMkE78Oreallohd9OhtXO9HGCzokYkra0DjMvkWXOBwDScZJJGNRj__unISfqlWNr3FL5bx5etN--WlPxEFIjshFb_y2AsgP3LlYW2cspfXkEQY4N8nAjYBN-VItBCDS1x3JptIMO3gRJeZoCYIf3FbczX0S9hrmhzsyPp-4dA8S_YgoVYhrxtJ_dGyX0',
    category: 'electronics',
    tag: 'ХЯМДРАЛ',
    soldCount: '150+'
  },
  {
    id: '6',
    name: 'Organic Арьс арчилгааны иж бүрдэл',
    price: 112000,
    originalPrice: 185000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnWM6caMxhIjf7klpZBrYYyNjbMTp74yyvezUFvlLrlOn8uaVUIf4dXJSzP_UwxkCYYFmaQHFVCjlSIPDjXvYGzxcKEccoJhToGKM62ugyRcv2VLyLZIxbTp_gfGfpZ_hB0WMbzzjYyulow5nW4UJsoUobOzg2GjKX4RUcOM0ezXgNdPrXS905Q7XYKALZzK5--YwLbBcq3xpCRMPja4_QSQdPfcEm1OYhMnT1J3SO3uC2VcOoidchPJeCYEg1dNW7ZVOa-6RvkIjE',
    category: 'beauty',
    tag: 'БЭЛЭГТЭЙ',
    soldCount: '2.1к+'
  }
];

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Шинэ бараа' },
  { id: '2', name: 'Хувцас хэрэглэл' },
  { id: '3', name: 'Цахилгаан бараа' },
  { id: '4', name: 'Гэр ахуйн бараа' },
  { id: '5', name: 'Гоо сайхан' },
  { id: '6', name: 'Ариун цэврийн хэрэгсэл' },
  { id: '7', name: 'Хүүхдийн хэсэг' },
  { id: '8', name: 'Хоол хүнс' },
  { id: '9', name: 'Төхөөрөмж' },
  { id: '10', name: 'Барилга' },
  { id: '11', name: 'Амралт, спорт' }
];

export const SUB_CATEGORIES: Record<string, Category[]> = {
  '1': [
    { id: 's1', name: 'Даашинз', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaEj7ImvQH_5yWJiAtNkUNT_mMjmNq4zzp11tsu866x66liypZ0qygobYLGI2LAT0Zccs7gt2BCRJX6JvCqBYOjtM65IqDgU_SEU7BG9NnY0VZ0ouMPDy5PDMt9Mm-X4OJZUYqQ68-4_pB5DFroCMgVX7FiQrxaj8Tq5NxK8-4lMEXhOQ0gCCPdtt6Ejf-Eb7Dw0rAUgh6d6NIoW52pWR3rtzoBfMVG-hQnfoi_F1lJDDN3NxcVI2njWyAQl_2X4PUBvDY6WFHbtwT' },
    { id: 's2', name: 'Жинс', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzguIBicYGq3tkngM-WDG7_-haux3D7af3HWPoiZzfEfcte8R7dX0iHG6lhr-ReHQXWv99tIEC4A0tGSvOuiVG1pDHpmNUSKEERTqyI0zkHMUilYgQ5zCq7A8RCWAspApfP-8RoMyfzRZVfG6FZsHvChbc7QHM54wVa_pn2xkk0ZjjXPFaoo6Y4jFn5vaTI8GizZ-YNMQROkW30IacNEfar9FMLIwtFYYcyFQ4wO6143VVGbGxYQPuNmnd9CeOTYHssLncbaCOcUl_' },
    { id: 's3', name: 'Хослол', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOvRPUKLYehysaZ2HhEAy6ktJ6NaOeJEdfewKBpO60yZAZQLvDPFqA-3AA7eWYsgH2gq5BRtjEIu2lQSWSD1mZwrF95EwmNUNmCl2pA-Nq0NG4vx3d3wpHSKc4d4B6EY7wLEhwP7aVMqxyUG1lSjSBkpzbnnFfUYG8304fqfCBN0pnfNJutijaSjstSQVeTOz9ONnnQDZCX7O-EnEScdRn4vqQa_7hvX1Ea68XmGALfQ_-scVZ23HaLAtYhW3F0dOARvaXdJPcOtRl' },
    { id: 's4', name: 'Футболк', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYgfUZSC47t3q_oT1zhcvWQwsU065QHDwOHm-5TlaqUqemJ0g6QoHUVXSDNeI8vbvttBfUwNnsjAOd74kqOcCaKkETJDOx9PFvHQIVLE7Kp7oh3yMsxRPxt6ut_SO3qI_RlSLVcBVe-J_0uYJnyVJFvTR1S8pGnvPUEcUa8GHPZSqVPDhsJhEMAS-PeOQxWMrEN478AO1U4Q4R5tqOKLcv169QX6IH-hB_-E9Sjfi_o1hx5t_6cNWGsShCciNWpdbcXgYPW0wCk53r' },
    { id: 's5', name: 'Гутал', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwXhjCAyVwBYe9WdMneZvDMAr6-EtXcRmGxp2-e6yh3FwAYXoPX7qTxpg4wQIqPQn2f0zdCr2BFvQi0xigNsWusMSMkL7Lmc7DCVGOxpI3vZ7JCwW0nK8ymmU1P63re7c58zz7_fswLSqSDm1fSLE4_mhnV7FUXLXfMId6hWKlGmgTY7L5KWMcRZBpSnY6zi_Yi7xq6vzuWlELpb-YBpKMovvOFfUBjUfBfG2kiT7cX5vauffLx3DYqUhq2VG5z3QJRATBh07h4k9J' },
    { id: 's6', name: 'Цүнх', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpSp1FOKQ8e6VqLvbAIQiPafvfMV2whZY5FRBy-GG-UcHreE-8518SDKtLNqDckPzjszeuCkR87afRB-K4UbjDd3yK8cMTTohCYRO7kTEfjCPxIRFyuEtcOmkAaJL8namAB4gm_KrfpkleU2vu_aiK5ySt6hjNtCGjv3oxSb7YDiNmFIlYVH2wnOsocJVWpm3DO2NldpLAemdf9W4zA4n8w54LE-OLxiOHSqO3PxS-jP3yHTEe0LMw_SV8VsrufszlnUfMX3SrV6qC' },
    { id: 's7', name: 'Ноосон цамц', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvD-7e1Os530OyoX0_tlnrSZQJfqtPXH7OIhTI5OG9MEuobnlnaKeCzdql1WQVRdUHjt7kHIPLgX71n2f_pwA_6iKyGqIa3lJ_HOMw9UtgoXrdLRZWeYhQwvs2Iz2KB43z-v4Gwv6AJUM9gNtHrQi4pKzZEOsYYFnSQSOEVo7hNxzQHp3WEH4iAEGT9g7nLnj09-fd7_0hepbrZDXuWwwY05d7rWo78aa_lVLxyFGVbywCmZHs9GiTY6_5FQfxmwcsmFO-2C8pQ1no' },
    { id: 's8', name: 'Гадуур хувцас', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbfyz1L5FSHhr63Rz-WDqmSabPE0-jXWjlPkAThyHdr8dhsO61YtV7WuPx1X4hz32h77LD0pJVQinIhBTEAJGYmepGowsvqU_tjEFIIipFRKil7Z6aEZRD50QTMJpTkYewp34fRc8lM-P9Gj_g74y4GAG_rvsMwbFdrX9S5AUCcqKGPWUkBVs7FubJjbuxf0yCFWrBiGK-CIg6AMb0yztC5Ior5rXqj5QA1PHvso191Zi3xO83PFSKG4_W84FmHIHkuXehflvHPUt3' },
    { id: 's9', name: 'Унтлагын хувцас', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA_9DSDbcKmXrmRPPbihgPanJ-8NAciHFCFuIBVx8p_mYSbzrzH6gTCcALitrH0R3gav10I9NVR6hKTQJKc1ABYgcQWI1R_8CO5q0y56932dTKe_okjXZrL-wLMRXbtSUfGpGFRpn6tk0vFWptfTSotVYQGvfTu2HvNRDSaMLgb7PV18sPRQc578JJ6fODgql7EY6X-quArKBIt8S9_KhkVIwrV3v6J1L_SKqUs_MQwIJP-Z6w3BAy3VMWMOkH94iJ6bj-4SMUBWs0' },
    { id: 's10', name: 'Аксессуар', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC9cThDK48R2ZeUpYq18BNBFlTdmrfsoU7zXDWKeEFLoC4XR0R3rEtjgIyq-NvzCRFKXUvFBFDJlDSbfg1Io4LKa9tRmqWh8sB8T-bFoM7LgytH8_Z6qRDZ_lml9PmLOXlYxKBtmN5UP3QRFAJC4ssw04VfvK7mtMb1A6Te3rbZaw2U1dIQOTAs0MbESabSezM5dLcdqfPO1bcRe6JdJ1EZGozF7ywK8yFtQUTX4hp__42FU3h11Lsrjv3S3TaxCGznZdBdwiLQMMr', isNew: true },
    { id: 's11', name: 'Ороолт', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4poGCfvrti178XAu6dbvu2l9pGxKxVQJ8KddIjdpT3g2tZuX3Fm3hmYkUcvIMChdyVdr26nESbSC403ZYwXlBc15fG0p-8MhKSIZHPPdbDLEMclkbz-J9pJNKpwMkPJETZ3tuqlvnGMjx7_Cw-78Xd02eYVM1v4pOQJrP3hKoCjQev2qD7cCkJQ3jdfEA3F7IIjmzA_u4UAsG0JPkdslz0Fl5vJQo1grZsHl6DrapMRmjNXwj1nrV2H34BLaN7SIhriTHPxE3TV-B' },
  ]
};
