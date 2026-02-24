
import { Product, Category, SubCategory } from './types';

export const PRODUCTS: Product[] = [];

// Fix: Corrected type definition to SubCategory[] so the 'image' property is recognized, resolving lines 83-93 errors.
export const SUB_CATEGORIES: Record<string, SubCategory[]> = {
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

// Fix: Added the required 'subCategories' property to all Category items to satisfy the interface, resolving lines 68-78 errors.
export const CATEGORIES: Category[] = [
  { id: '1', name: 'Шинэ бараа', subCategories: SUB_CATEGORIES['1'] || [] },
  { id: '2', name: 'Хувцас хэрэглэл', subCategories: [] },
  { id: '3', name: 'Цахилгаан бараа', subCategories: [] },
  { id: '4', name: 'Гэр ахуйн бараа', subCategories: [] },
  { id: '5', name: 'Гоо сайхан', subCategories: [] },
  { id: '6', name: 'Ариун цэврийн хэрэгсэл', subCategories: [] },
  { id: '7', name: 'Хүүхдийн хэсэг', subCategories: [] },
  { id: '8', name: 'Хоол хүнс', subCategories: [] },
  { id: '9', name: 'Төхөөрөмж', subCategories: [] },
  { id: '10', name: 'Барилга', subCategories: [] },
  { id: '11', name: 'Амралт, спорт', subCategories: [] }
];
