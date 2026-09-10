import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import HeaderShell from "@/components/HeaderShell";

export default function Header({ blok }) {
  const navItems = blok.nav_items || [];

  const renderNav = (variant) =>
    navItems.map((nestedBlok) => (
      <StoryblokServerComponent
        key={`${variant}-${nestedBlok._uid}`}
        blok={nestedBlok}
        variant={variant}
      />
    ));

  return (
    <div {...storyblokEditable(blok)}>
      <HeaderShell
        logoText={blok.logo_text}
        desktopNav={renderNav("desktop")}
        mobileNav={renderNav("mobile")}
      />
    </div>
  );
}
