import { isDev } from "@/lib/utils";

export const getSubscriptionsPriceIds = (sub: string) => {
  switch (sub) {
    case 'basic-monthly': {
      return isDev 
        ? 'price_1SRacoDCH60nO5QdUtBdUPDB'
        : 'price_1SRbDrRgWGEzzROe0XTf5NdT';
    }
    case 'basic-quarterly': {
      return isDev
        ? 'price_1SRaetDCH60nO5QdHQgKTEf6'
        : 'price_1SRbEBRgWGEzzROeSsepxdqm';
    }
    case 'basic-yearly': {
      return isDev
        ? 'price_1SRag3DCH60nO5QdvznLzghw'
        : 'price_1SRbERRgWGEzzROebbLFRjhy';
    }
    default: {
      console.error(`Invalid subscription type: ${sub}`);
      return '';
    }
  }
};