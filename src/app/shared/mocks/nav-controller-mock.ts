
export class NavControllerMock {

  public navigateRoot(route: string) {
    return Promise.resolve(true);
  }
}
