export interface NavItem {
    title: string;
    href: string;
}

export interface SocialLink {
    name: string;
    href: string;
    icon: string;
}

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    link?: string;
}

export interface TeamMember {
    id: string;
    name: string;
    title: string;
    imageUrl: string;
    bio: string;
    socialLinks?: SocialLink[];
}

export interface Locale {
    code: string;
    name: string;
    dir: "ltr" | "rtl";
}