import { CollaborationService } from './../../services/collaboration.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as ace from 'ace-builds';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  editor: any;
  public languages: string[] = ['Java', 'Python'];
  language: string = 'Java'; // default
  sessionId: string;
  output: string = '';

  defaultContent = {
    Java: `public class Solution {
    public static void main(String[] args) {
        // Type your Java code here
    }
  }`,
    Python: `class Solution:
        def example():
            # Write your Python code here`,
  };

  constructor(
    private collaboration: CollaborationService,
    private data: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // use problem id as sessionId
    // since we subscribe the changes, every time the params changes
    // sessionId will be updated and the editor will be initialized
    this.route.params.subscribe((params) => {
      this.sessionId = params['id'];
      this.initEditor();
    });
    this.collaboration.restoreBuffer();
  }

  initEditor() {
    ace.config.set('fontSize', '14px');
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.editor.$blockScrolling = Infinity;

    this.resetEditor();
    document.getElementsByTagName('textarea')[0].focus();
    // setup collaboration socket
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    // register a change callback
    this.editor.on('change', (e) => {
      console.log('editor changes: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });

    this.editor
      .getSession()
      .getSelection()
      .on('changeCursor', () => {
        let cursor = this.editor.getSession().getSelection().getCursor();
        console.log('cursor moves: ' + JSON.stringify(cursor));
        this.collaboration.cursorMove(JSON.stringify(cursor));
      });

    this.collaboration.restoreBuffer();
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    this.editor.getSession().setMode('ace/mode/' + this.language.toLowerCase());
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = '';
  }

  submit(): void {
    // let userCode = this.editor.getValue();
    // let data = {
    // user_code: userCode,
    // lang: this.language.toLowerCase(),
    // };
    this.data.buildAndRun();
  }
}
