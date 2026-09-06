import { ExtractedLink } from "./types";

/**
 * PhÃ¢n tÃ­ch chuá»—i chá»©a link (ngÄƒn cÃ¡ch báº±ng \n hoáº·c khoáº£ng tráº¯ng)
 * vÃ  nháº­n diá»‡n loáº¡i liÃªn káº¿t (Instagram, Web, Youtube, v.v.)
 */
export function extractLinks(rawText?: string): ExtractedLink[] {
  if (!rawText) return [];

  // TÃ¬m táº¥t cáº£ cÃ¡c URL trong chuá»—i
  const urlRegex = /(https?:\/\/[^\s\)\"\'\,]+)/gi;
  const matches = rawText.match(urlRegex) || [];
  
  // Lá»c trÃ¹ng láº·p
  const uniqueUrls = Array.from(new Set(matches.map(u => u.trim())));

  return uniqueUrls.map((url) => {
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes("instagram.com")) {
      return {
        url,
        type: "instagram",
        label: "Instagram",
      };
    }
    if (urlLower.includes("youtube.com") || urlLower.includes("youtu.be")) {
      return {
        url,
        type: "youtube",
        label: "YouTube",
      };
    }
    if (urlLower.includes("facebook.com") || urlLower.includes("fb.com")) {
      return {
        url,
        type: "facebook",
        label: "Facebook",
      };
    }
    if (urlLower.endsWith(".pdf") || urlLower.includes("pdf")) {
      return {
        url,
        type: "pdf",
        label: "TÃ i liá»‡u PDF",
      };
    }

    // Láº¥y domain rÃºt gá»n lÃ m label cho website
    try {
      const parsed = new URL(url);
      const hostname = parsed.hostname.replace(/^www\./, "");
      return {
        url,
        type: "website",
        label: hostname || "Website",
      };
    } catch {
      return {
        url,
        type: "website",
        label: "Website",
      };
    }
  });
}

/**
 * Chuáº©n hÃ³a tÃªn song ngá»¯ (VÃ­ dá»¥: "Iwate Wagyu ã„ã‚ã¦ç‰›" -> { en: "Iwate Wagyu", jp: "ã„ã‚ã¦ç‰›" })
 */
export function splitBilingualName(name: string): { primary: string; secondary: string } {
  if (!name) return { primary: "", secondary: "" };
  
  const parts = name.split(/\n+/);
  if (parts.length > 1) {
    return {
      primary: parts[0].trim(),
      secondary: parts.slice(1).join(" â€¢ ").trim(),
    };
  }

  // Thá»­ tÃ¡ch theo dáº¥u ngoáº·c Ä‘Æ¡n ()
  const matchParen = name.match(/^(.*?)\((.*?)\)$/);
  if (matchParen) {
    return {
      primary: matchParen[1].trim(),
      secondary: matchParen[2].trim(),
    };
  }

  return { primary: name.trim(), secondary: "" };
}

/**
 * Cáº¯t ngáº¯n Ä‘oáº¡n vÄƒn báº£n vá»›i sá»‘ kÃ½ tá»± tá»‘i Ä‘a
 */
export function truncateText(text: string, maxLength: number = 140): string {
  if (!text) return "";
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.slice(0, maxLength) + "...";
}