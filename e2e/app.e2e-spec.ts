import { ByopDemoPage } from './app.po';

describe('byop-demo App', function() {
  let page: ByopDemoPage;

  beforeEach(() => {
    page = new ByopDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
