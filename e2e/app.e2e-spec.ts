import { AngularEscherPage } from './app.po';

describe('angular-escher App', () => {
  let page: AngularEscherPage;

  beforeEach(() => {
    page = new AngularEscherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
