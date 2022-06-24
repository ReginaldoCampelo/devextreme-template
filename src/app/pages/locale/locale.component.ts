import { Component, OnInit } from '@angular/core';
import { Locale, LocaleService, Payment } from './shared/services/locale.service';

import { locale, loadMessages, formatMessage } from 'devextreme/localization';

import * as deMessages from 'devextreme/localization/messages/de.json';
import * as ruMessages from 'devextreme/localization/messages/ru.json';

@Component({
  selector: 'app-locale',
  templateUrl: './locale.component.html',
  styleUrls: ['./locale.component.scss']
})
export class LocaleComponent implements OnInit {
  locale: string;

  locales: Locale[];

  payments: Payment[];

  formatMessage = formatMessage;

  constructor(private service: LocaleService) {
    this.locale = this.getLocale();
    this.payments = service.getPayments();
    this.locales = service.getLocales();

    this.initMessages();
    locale(this.locale);
  }

  initMessages() {
    loadMessages(deMessages);
    loadMessages(ruMessages);
    loadMessages(this.service.getDictionary());
  }

  changeLocale(data) {
    this.setLocale(data.value);
    parent.document.location.reload();
  }

  getLocale() {
    const locale = sessionStorage.getItem('locale');
    return locale != null ? locale : 'en';
  }

  setLocale(locale) {
    sessionStorage.setItem('locale', locale);
  }


  ngOnInit(): void {
  }

}
