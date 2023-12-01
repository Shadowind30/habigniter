interface ShowOptions {
  autoHide?: boolean;

  fadeInDuration?: number;
  fadeOutDuration?: number;
  showDuration?: number;
}
interface HideOptions {
  fadeOutDuration?: number;
}

export const SplashScreen = {
  async show(options?: ShowOptions) {},
  async hide(options?: HideOptions) {}
};
