import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      Homepage: "https://www.kekeho.net",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.Explorer({
      title: "Pinned",
      filterFn: (node) => {
        if (node.file === null) {
          // Dir
          const pinned = [
            "日報"
          ];
          return pinned.includes(node.name);
        }

        const pinned = [
          "日報/",
          "大事にしたいお言葉",
        ];
        for (let i = 0; i < pinned.length; i++) {
          const p = pinned[i];
          const name: String = node.name;
          if (name.includes(p)) return true;
        }
        return false;
      },
    }),
    Component.RecentNotes({
      limit: 5,
    }),
  ],
  right: [
    Component.Graph({
      localGraph: {
        depth: 3,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}

