import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { WalletService } from 'src/app/services/wallet.service';

@Directive({
  selector: '[appCopyToClipboard]'
})
export class CopyToClipboardDirective {
  constructor(private toastMessageService: ToastMessageService, private walletService: WalletService) { }
  @Input() textToCopy;
  @HostListener('click', ['$event']) onclick(event){
    console.log(this.textToCopy);
      try {
        navigator.clipboard.writeText(this.textToCopy).then();
        this.toastMessageService.msg.next({ message: 'copied to clipboard', segmentClass: 'toastInfo' })
      } catch (error) {
        console.error(error);
      }
    
  }

}
