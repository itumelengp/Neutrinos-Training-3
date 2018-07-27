import { HostBinding, Component, OnInit } from '@angular/core';
import { slideInDownAnimation } from '../../animations';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  animations:[slideInDownAnimation]
})
export class MessagesComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'relative';

  //service injected as public because it is bound to in a template, angular only binds to public component properties
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
