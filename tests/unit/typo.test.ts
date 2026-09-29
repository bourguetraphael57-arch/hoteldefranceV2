import { describe, expect, it } from 'vitest';
import { typoHtml, typoTexte } from '../../src/lib/typo';

describe('typographie française', () => {
  it('insère les espaces insécables', () => {
    expect(typoTexte('Comment réserver ? À confirmer : oui ; « menu »')).toBe(
      'Comment réserver ? À confirmer : oui ; « menu »',
    );
  });
  it('ne touche ni aux URL, ni aux heures, ni au code', () => {
    expect(typoTexte('https://exemple.fr 12:30')).toBe('https://exemple.fr 12:30');
    const html = '<p>Oui ?</p><script>a ? b : c</script><textarea>x ?</textarea><a title="a ?">b ?</a>';
    expect(typoHtml(html)).toBe('<p>Oui ?</p><script>a ? b : c</script><textarea>x ?</textarea><a title="a ?">b ?</a>');
  });
});
