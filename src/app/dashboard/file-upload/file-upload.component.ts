import { Component, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {

  fileInputChange$: Subject<EventTarget> = new Subject<EventTarget>();
  @Output() onSelect: Observable<any> = this.fileInputChange$
    // Map the Event to the selected file
    .map(event => {
        const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        const files: FileList = target.files;
        return files[0];
    })
    // Asynchronously read the file contents
    .flatMap(file => this.readFile(file));

  private readFile(file) {
    return new Observable(observer => {
      const fr = new FileReader();
      // Emit JSON result and complete emission when the FileReader loaded the content
      fr.onload = (ev) => {
        const target = <FileReader> ev.target;
        observer.next(JSON.parse(target.result));
        observer.complete();
      };

      // Notify on error
      fr.onerror = (e: ErrorEvent) => {
        observer.error(e);
      };

      fr.readAsText(file);
    });
  }
}
