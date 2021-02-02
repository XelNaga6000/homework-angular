import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ConfigOptionsService } from 'src/app/core/services/config-options.service';
import { constantsToken } from 'src/app/core/services/constants.service';
import { generatedString, GeneratorFactory, GeneratorService } from 'src/app/core/services/generator.service';
import { localStorageKeyToken, LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Constants } from 'src/app/core/shared/constants.interface';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  providers: [
    GeneratorService,
    LocalStorageService,
    { provide: generatedString, useFactory: GeneratorFactory(10), deps: [GeneratorService] },
    { provide: localStorageKeyToken, useValue: 'storage-key' }
  ]
})
export class FirstComponent implements OnInit {
  title: string;
  version: string;
  user = 'no user';
  storedValue = '';

  constructor(
    @Optional() private configOptionsService: ConfigOptionsService,
    @Inject(constantsToken) private constants: Constants,
    @Inject(generatedString) public randomString10: string,
    @Optional() private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    if (this.configOptionsService) {
      this.configOptionsService.setConfig({login: 'aaa', email: 'a@a.a'});
      const { login, email } = this.configOptionsService.getConfig();
      this.user = `${login} - ${email}`;
    }

    if (this.localStorageService) {
      this.localStorageService.setValue('test');
      this.storedValue = this.localStorageService.getValue();
    }

    this.title = this.constants.app;
    this.version = this.constants.ver;
  }

}
