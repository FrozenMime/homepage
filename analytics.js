// PostHog web analytics for paulbendorsamuel.com.
// Cookieless: nothing is stored in the visitor's browser, so no consent banner is needed.
// The project token is public by design; it can only send events, not read them.

!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

posthog.init('phc_n6N59x2Frc3pXbMaLLTughw5cfPTzAqULNE3ePoAbWL6', {
  api_host: 'https://us.i.posthog.com',
  defaults: '2026-08-30',
  cookieless_mode: 'always',
  person_profiles: 'never',
});

// Where a link goes, in plain words, for grouping on the dashboard.
function destination(url) {
  if (url.protocol === 'mailto:') return 'email';
  const host = url.hostname.replace(/^www\./, '');
  if (host.endsWith('substack.com')) return 'substack';
  if (host === 'a.co' || host.endsWith('amazon.com')) return 'amazon';
  if (host.endsWith('linkedin.com')) return 'linkedin';
  if (host === 'x.com' || host === 'twitter.com') return 'x';
  return host;
}

// One event for every link that leaves the site: essays, write-ups, books, socials, email.
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.hostname === location.hostname && url.protocol !== 'mailto:') return;
  const section = link.closest('[data-section]');
  const item = link.closest('[data-item]');
  posthog.capture('outbound_link_clicked', {
    destination: destination(url),
    section: section ? section.dataset.section : null,
    item: item ? item.dataset.item : null,
    link_text: link.textContent.trim().slice(0, 80),
    link_url: url.protocol === 'mailto:' ? 'mailto' : url.href,
  });
});

